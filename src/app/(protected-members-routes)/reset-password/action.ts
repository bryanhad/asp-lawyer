'use server'

import { getZodIssues } from '@/lib/server-utils'
import { globalPOSTRateLimit } from '../lib/server/request'
import { validatePasswordResetSessionRequest } from '../lib/server/password-reset'
import { ExpiringTokenBucket } from '../lib/server/rate-limit'
import { formSchema } from './validation'
import prisma from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { redirect } from 'next/navigation'

type FormState = {
    message: string
    success: boolean
    fields?: Record<string, string> // to re-populate the input fields which is from the client
    issues?: ReturnType<typeof getZodIssues<typeof formSchema>> // to show any input errors from the fromschema
}

const emailVerificationBucket = new ExpiringTokenBucket<number>(5, 60 * 30)

export default async function verifyPasswordResetEmailAction(
    _prevState: FormState,
    data: FormData,
): Promise<FormState> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const { session, user } = await validatePasswordResetSessionRequest()
    if (session === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }
    /**
     * why are you here to verify your "password reset session" again?
     * Get out!
     */
    if (session.emailIsVerified) {
        return {
            success: false,
            message: 'Forbidden',
        }
    }
    if (!emailVerificationBucket.check(session.userId, 1)) {
        return {
            success: false,
            message: 'Too many requests',
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

    if (!emailVerificationBucket.consume(session.userId, 1)) {
        return { success: false, message: 'Too many requests' }
    }
    if (code !== session.code) {
        return {
            success: false,
            message: 'Incorrect code',
        }
    }
    emailVerificationBucket.reset(session.userId)
    try {
        const userUpdated = await prisma.$transaction(async (tx) => {
            /**
             * Update "password_reset_session" "email is verified" status to true
             */
            await tx.passwordResetSession.update({
                data: { emailIsVerified: true },
                where: { id: session.id },
            })
            /**
             * Update user's "email is verified" status to true
             * If email matches with the session
             */
            const userUpdated = await tx.user.updateMany({
                data: { emailIsVerified: true },
                where: { id: session.userId, email: session.email },
            })
            return userUpdated
        })
        if (userUpdated.count === 0) {
            return {
                success: false,
                message: 'Please restart the process',
            }
        }
    } catch (err) {
        logger.error('Error in email verification transaction', JSON.stringify(err))
        return {
            fields: parsedData.data,
            success: false,
            message: 'An unexpected error occurred.\nPlease try again later.',
        }
    }

    return redirect(`/members?toast=${encodeURIComponent(`Welcome aboard ${user.username}!`)}`)
}
