'use server'

import { getZodIssues } from '@/lib/server-utils'
import { resetPasswordFormSchema } from './validation'
import { globalPOSTRateLimit } from '../lib/server/request'
import {
    deletePasswordResetSessionTokenCookie,
    invalidateUserPasswordResetSessions,
    validatePasswordResetSessionRequest,
} from '../lib/server/password-reset'
import { verifyPasswordStrength } from '../lib/server/password'
import prisma from '@/lib/prisma'
import { createSession, generateSessionToken, invalidateUserSessions, setSessionTokenCookie } from '../lib/server/auth'
import { updateUserPassword } from '../lib/server/user'
import { redirect } from 'next/navigation'
import { logger } from '@/lib/logger'

type FormState = {
    message: string
    success: boolean
    fields?: Record<string, string> // to re-populate the input fields which is from the client
    issues?: ReturnType<typeof getZodIssues<typeof resetPasswordFormSchema>> // to show any input errors from the fromschema
}

export async function resetPasswordAction(_prevState: FormState, data: FormData): Promise<FormState> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }
    const { session: passwordResetSession, user } = await validatePasswordResetSessionRequest()
    if (passwordResetSession === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }
    if (!passwordResetSession.emailIsVerified) {
        return {
            success: false,
            message: 'Forbidden',
        }
    }

    const formData = Object.fromEntries(data)
    const parsedData = resetPasswordFormSchema.safeParse(formData)

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
            issues: getZodIssues<typeof resetPasswordFormSchema>(parsedData),
        }
    }

    const { password } = parsedData.data

    const strongPassword = await verifyPasswordStrength(password)
    if (!strongPassword) {
        return {
            fields: parsedData.data,
            success: false,
            message: 'Weak password',
        }
    }
    try {
        await prisma.$transaction(async (tx) => {
            await invalidateUserPasswordResetSessions(tx, passwordResetSession.userId)
            await invalidateUserSessions(tx, passwordResetSession.userId)
            await updateUserPassword(tx, passwordResetSession.userId, password)

            const sessionToken = generateSessionToken()
            const session = await createSession(sessionToken, user.id, tx)
            await setSessionTokenCookie(sessionToken, session.expiresAt)
            deletePasswordResetSessionTokenCookie()
        })
    } catch (err) {
        logger.error('Error in email verification transaction', JSON.stringify(err))
        return {
            fields: parsedData.data,
            success: false,
            message: 'An unexpected error occurred.\nPlease try again later.',
        }
    }

    return redirect(`/members?toast=${encodeURIComponent(`Your password has been updated`)}`)
}
