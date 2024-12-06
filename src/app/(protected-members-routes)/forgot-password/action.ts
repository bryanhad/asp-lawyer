import { getZodIssues } from '@/lib/server-utils'
import { formSchema } from './validation'
import { globalPOSTRateLimit } from '../lib/server/request'
import { RefillingTokenBucket } from '../lib/server/rate-limit'
import { headers } from 'next/headers'
import { getUserFromEmail } from '../lib/server/user'
import {
    createPasswordResetSession,
    invalidateUserPasswordResetSessions,
    sendPasswordResetEmail,
    setPasswordResetSessionTokenCookie,
} from '../lib/server/password-reset'
import prisma from '@/lib/prisma'
import { generateSessionToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { logger } from '@/lib/logger'

const passwordResetEmailIPBucket = new RefillingTokenBucket<string>(3, 60)
const passwordResetEmailUserBucket = new RefillingTokenBucket<number>(3, 60)

type FormState = {
    message: string
    success: boolean
    fields?: Record<string, string> // to re-populate the input fields which is from the client
    issues?: ReturnType<typeof getZodIssues<typeof formSchema>> // to show any input errors from the fromschema
}

export async function forgotPasswordAction(_prevState: FormState, data: FormData): Promise<FormState> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }
    // TODO: Assumes X-Forwarded-For is always included.
    const headerStore = await headers()
    const clientIP = headerStore.get('X-Forwarded-For')
    if (clientIP !== null && !passwordResetEmailIPBucket.check(clientIP, 1)) {
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
            message: 'Invalid fields',
            fields,
            issues: getZodIssues<typeof formSchema>(parsedData),
        }
    }

    const { email } = parsedData.data

    const user = await getUserFromEmail(email)
    if (user === null) {
        return {
            success: false,
            message: 'Account does not exist',
            fields: parsedData.data,
        }
    }
    if (clientIP !== null && !passwordResetEmailIPBucket.consume(clientIP, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }
    if (!passwordResetEmailUserBucket.consume(user.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    try {
        await prisma.$transaction(async (tx) => {
            await invalidateUserPasswordResetSessions(tx, user.id)
            const sessionToken = generateSessionToken()
            const session = await createPasswordResetSession(tx, sessionToken, user.id, user.email)

            await sendPasswordResetEmail(session.email, session.code)
            await setPasswordResetSessionTokenCookie(sessionToken, session.expiresAt)
        })
    } catch (err) {
        logger.error('Error in password reset transaction', JSON.stringify(err))
        return {
            success: false,
            message: 'An unexpected error occurred.\nPlease try again later.',
        }
    }

    return redirect('/reset-password/verify-email')
}
