'use server'

import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import prisma from '@/lib/prisma'
import { getZodIssues } from '@/lib/server-utils'
import { redirect } from 'next/navigation'
import {
    createEmailVerificationRequest,
    deleteEmailVerificationRequestCookie,
    deleteUserEmailVerificationRequest,
    getUserEmailVerificationRequestFromRequest,
    sendVerificationEmail,
    sendVerificationEmailBucket,
    setEmailVerificationRequestCookie,
} from '../lib/server/email-verification'
import { invalidateUserPasswordResetSessions } from '../lib/server/password-reset'
import { ExpiringTokenBucket } from '../lib/server/rate-limit'
import { globalPOSTRateLimit } from '../lib/server/request'
import { updateUserEmailAndSetEmailAsVerified } from '../lib/server/user'
import { formSchema } from './validation'
import { logger } from '@/lib/logger'

const bucket = new ExpiringTokenBucket<number>(5, 60 * 30)

type FormState = {
    message: string
    success?: boolean
    fields?: Record<string, string> // to re-populate the input fields which is from the client
    issues?: ReturnType<typeof getZodIssues<typeof formSchema>> // to show any input errors from the fromschema
}

export async function verifyEmailAction(_prevState: FormState, data: FormData): Promise<FormState> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const { session, user } = await getCurrentSession()
    if (session === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

    if (!bucket.check(user.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    let verificationRequest = await getUserEmailVerificationRequestFromRequest()
    if (verificationRequest === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

    const formData = Object.fromEntries(data)
    const parsedData = formSchema.safeParse(formData)

    if (!parsedData.success) {
        /**
         * we have to convert it into an actual object type where the field is a string and the values are also string
         * which contains the prev values
         * ex:
         *  {[field-name]: [field-value], ...}
         */
        const fields: Record<string, string> = {}
        for (const key of Object.keys(formData)) {
            if (typeof formData[key] === 'string') {
                fields[key] = formData[key]
            }
        }
        return {
            success: false,
            message: 'Invalid field',
            fields,
            issues: getZodIssues<typeof formSchema>(parsedData),
        }
    }

    const { code } = parsedData.data

    if (!bucket.consume(user.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    if (Date.now() >= verificationRequest.expiresAt.getTime()) {
        verificationRequest = await createEmailVerificationRequest(
            verificationRequest.userId,
            verificationRequest.email,
        )
        await sendVerificationEmail(verificationRequest.email, verificationRequest.code)
        return {
            success: true,
            message: 'The verification code was expired. We have sent another code to your inbox.',
        }
    }
    if (verificationRequest.code !== code) {
        return {
            fields: parsedData.data,
            success: false,
            message: 'Incorrect code.',
        }
    }
    try {
        await prisma.$transaction(async (tx) => {
            await deleteUserEmailVerificationRequest(tx, user.id)
            await invalidateUserPasswordResetSessions(tx, user.id)
            await updateUserEmailAndSetEmailAsVerified(tx, user.id, verificationRequest.email)
            await deleteEmailVerificationRequestCookie()
        })
    } catch (err) {
        logger.error('Error in email verification transaction', JSON.stringify(err))
        return {
            fields: parsedData.data,
            success: false,
            message: 'An unexpected error occurred.\nPlease try again later.',
        }
    }
    logger.info('sampe 5?')
    return redirect(`/members?toast=${encodeURIComponent(`Welcome aboard ${user.username}!`)}`)
}

export async function resendEmailVerificationCodeAction(_prevState: FormState): Promise<FormState> {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

    if (!sendVerificationEmailBucket.check(user.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }
    let verificationRequest = await getUserEmailVerificationRequestFromRequest()

    if (verificationRequest === null) {
        if (user.emailIsVerified) {
            return {
                success: false,
                message: 'Forbidden',
            }
        }
        if (!sendVerificationEmailBucket.consume(user.id, 1)) {
            return {
                success: false,
                message: 'Too many requests',
            }
        }
        verificationRequest = await createEmailVerificationRequest(user.id, user.email)
    } else {
        if (!sendVerificationEmailBucket.consume(user.id, 1)) {
            return {
                success: false,
                message: 'Too many requests',
            }
        }
        verificationRequest = await createEmailVerificationRequest(user.id, verificationRequest.email)
    }
    await sendVerificationEmail(verificationRequest.email, verificationRequest.code)
    await setEmailVerificationRequestCookie(verificationRequest)
    return {
        success: true,
        message: 'A new code was sent to your inbox.',
    }
}
