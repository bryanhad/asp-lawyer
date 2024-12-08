'use server'

import { FormState } from '@/lib/types'
import { updateEmailFormSchema, updatePasswordFormSchema } from './validation'
import { globalPOSTRateLimit } from '../../lib/server/request'
import {
    createSession,
    generateSessionToken,
    getCurrentSession,
    invalidateUserSessions,
    setSessionTokenCookie,
} from '../../lib/server/auth'
import {
    createEmailVerificationRequest,
    sendVerificationEmail,
    sendVerificationEmailBucket,
    setEmailVerificationRequestCookie,
} from '../../lib/server/email-verification'
import { getZodIssues } from '@/lib/server-utils'
import { checkEmailAvailability } from '../../lib/server/email'
import { redirect } from 'next/navigation'
import { ExpiringTokenBucket } from '../../lib/server/rate-limit'
import { verifyPasswordHash, verifyPasswordStrength } from '../../lib/server/password'
import { getUserPasswordHash, updateUserPassword } from '../../lib/server/user'
import prisma from '@/lib/prisma'
import { logger } from '@/lib/logger'

type UpdateEmailFormState = FormState<typeof updateEmailFormSchema>
type UpdatePasswordFormSchema = FormState<typeof updatePasswordFormSchema>

const passwordUpdateBucket = new ExpiringTokenBucket<string>(5, 60 * 30)

export async function updateEmailAction(
    _prevState: UpdateEmailFormState,
    data: FormData,
): Promise<UpdateEmailFormState> {
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
    if (!sendVerificationEmailBucket.check(user.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const formData = Object.fromEntries(data)
    const parsedData = updateEmailFormSchema.safeParse(formData)

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
            message: 'Invalid fields',
            fields,
            issues: getZodIssues<typeof updateEmailFormSchema>(parsedData),
        }
    }

    const { email } = parsedData.data

    const emailAvailable = await checkEmailAvailability(email)
    if (!emailAvailable) {
        return {
            success: false,
            message: 'This email is already used',
        }
    }
    if (!sendVerificationEmailBucket.consume(user.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }
    const verificationRequest = await createEmailVerificationRequest(user.id, email)
    await sendVerificationEmail(verificationRequest.email, verificationRequest.code)
    await setEmailVerificationRequestCookie(verificationRequest)
    return redirect(`/verify-email?toast=${encodeURIComponent(`Please check email inbox for ${user.email}`)}`)
}

export async function updatePasswordAction(
    _prev: UpdatePasswordFormSchema,
    data: FormData,
): Promise<UpdatePasswordFormSchema> {
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
    if (!passwordUpdateBucket.check(session.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const formData = Object.fromEntries(data)
    const parsedData = updatePasswordFormSchema.safeParse(formData)

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
            message: 'Invalid fields',
            fields,
            issues: getZodIssues<typeof updatePasswordFormSchema>(parsedData),
        }
    }

    const { currentPassword, newPassword } = parsedData.data

    const strongPassword = await verifyPasswordStrength(newPassword)
    if (!strongPassword) {
        return {
            fields: parsedData.data,
            success: false,
            message: 'Weak password',
        }
    }
    if (!passwordUpdateBucket.consume(session.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const passwordHash = await getUserPasswordHash(user.id)
    if (!passwordHash) {
        return {
            fields: parsedData.data,
            success: false,
            message: 'Invalid user',
        }
    }
    const validPassword = await verifyPasswordHash(passwordHash, currentPassword)
    if (!validPassword) {
        return {
            fields: parsedData.data,
            success: false,
            message: 'Incorrect password',
        }
    }

    passwordUpdateBucket.reset(session.id)

    try {
        const { sessionToken, newSession } = await prisma.$transaction(async (tx) => {
            await invalidateUserSessions(tx, user.id)
            await updateUserPassword(tx, user.id, newPassword)
            const sessionToken = generateSessionToken()
            const newSession = await createSession(sessionToken, user.id, tx)
            return { sessionToken, newSession }
        })
        await setSessionTokenCookie(sessionToken, newSession.expiresAt)

        return {
            success: true,
            message: 'Password successfully updated',
        }
    } catch (err) {
        logger.error('Error in email verification transaction', JSON.stringify(err))
        return {
            fields: parsedData.data,
            success: false,
            message: 'An unexpected error occurred.\nPlease try again later.',
        }
    }
}
