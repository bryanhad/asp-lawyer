'use server'

import { redirect } from '@/i18n/routing'
import { getCurrentSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { verifyLocale } from '@/lib/server-utils'
import {
    createEmailVerificationRequest,
    deleteEmailVerificationRequestCookie,
    deleteUserEmailVerificationRequest,
    getUserEmailVerificationRequestFromRequest,
    sendVerificationEmail,
    sendVerificationEmailBucket,
    setEmailVerificationRequestCookie,
} from '../../lib/server/email-verification'
import { invalidateUserPasswordResetSessions } from '../../lib/server/password-reset'
import { ExpiringTokenBucket } from '../../lib/server/rate-limit'
import { globalPOSTRateLimit } from '../../lib/server/request'
import { updateUserEmailAndSetEmailAsVerified } from '../../lib/server/user'
import { VerifyEmailFormData, verifyEmailFormSchema } from './validation'

const bucket = new ExpiringTokenBucket<number>(5, 60 * 30)

export async function verifyEmailAction(
    formData: Partial<VerifyEmailFormData>,
    userLocale: string | undefined,
): Promise<{ success: boolean; message: string }> {
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

    const currentLocale = verifyLocale(userLocale)
    if (currentLocale === null) {
        throw new Error('Something went wrong')
    }

    const formDataValidation = verifyEmailFormSchema.safeParse(formData)
    if (!formDataValidation.success) {
        return {
            success: false,
            message: 'Invalid or missing fields',
        }
    }
    const { code } = formDataValidation.data

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
            success: false,
            message: 'The verification code was expired. We sent another code to your inbox.',
        }
    }
    if (verificationRequest.code !== code) {
        return {
            success: false,
            message: 'Incorrect code.',
        }
    }
    await prisma.$transaction(async (tx) => {
        await deleteUserEmailVerificationRequest(tx, user.id)
        await invalidateUserPasswordResetSessions(tx, user.id)
        await updateUserEmailAndSetEmailAsVerified(tx, user.id, verificationRequest.email)
        await deleteEmailVerificationRequestCookie()
    })

    return redirect({ href: '/', locale: currentLocale })
}

export async function resendEmailVerificationCodeAction(): Promise<{ success: boolean; message: string }> {
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
