'use server'

import { headers } from 'next/headers'
import { RefillingTokenBucket, Throttler } from '../../lib/server/rate-limit'
import { globalBucket, globalPOSTRateLimit } from '../../lib/server/request'
import { formSchema } from './validation'
import { getUserFromEmail, getUserPasswordHash } from '../../lib/server/user'
import { verifyPasswordHash } from '../../lib/server/password'
import { createSession, generateSessionToken, setSessionTokenCookie } from '@/lib/auth'
import { redirect } from '@/i18n/routing'
import { getCurrentLocale, verifyLocale } from '@/lib/server-utils'

const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300])
const ipBucket = new RefillingTokenBucket<string>(20, 1)

export type FormState = {
    message: string
    success?: boolean
    fields?: Record<string, string>
    issues?: string[]
}

export async function loginAction(_prevState: FormState, data: FormData): Promise<FormState> {
    const isAllowed_By_GlobalPOSTRateLimiter = globalPOSTRateLimit()
    console.log({ GLOBAL_IPB_AFTER_CONSUME: globalBucket })
    if (!isAllowed_By_GlobalPOSTRateLimiter) {
        console.log({ GLOBAL_IPB_ERROR: 'TOO MANY REQUESTS' })
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    // TODO: Assumes X-Forwarded-For is always included.
    const headerStore = await headers()
    const clientIP = headerStore.get('X-Forwarded-For')
    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const locale = await getCurrentLocale()
    const currentLocale = verifyLocale(locale)
    if (!currentLocale) {
        throw new Error('Something went wrong')
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
            issues: parsedData.error.issues.map((issue) => issue.message),
        }
    }
    const { email, password } = parsedData.data

    const user = await getUserFromEmail(email)
    if (user === null) {
        return {
            success: false,
            message: 'Account does not exist',
            fields: parsedData.data,
        }
    }

    if (clientIP !== null)  {
        const isAllowed_By_LoginActionRateLimiter = ipBucket.consume(clientIP, 1)
        console.log({ LOGIN_ACTION_ENDPOINT_IPB_AFTER_CONSUME: ipBucket })
        if (!isAllowed_By_LoginActionRateLimiter) {
        console.log({ LOGIN_ACTION_ENDPOINT_IPB_ERROR: 'TOO MANY REQUESTS' })
            return {
                message: 'Too many requests',
            }
        }
    }

    // if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    //     return {
    //         message: 'Too many requests',
    //     }
    // }
    if (!throttler.consume(user.id)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }
    const passwordHash = await getUserPasswordHash(user.id)
    if (!passwordHash) {
        return {
            success: false,
            message: 'Invalid User',
        }
    }
    const validPassword = await verifyPasswordHash(passwordHash, password)
    if (!validPassword) {
        return {
            success: false,
            message: 'Invalid password',
        }
    }

    throttler.reset(user.id)

    const sessionToken = generateSessionToken()
    const session = await createSession(sessionToken, user.id)
    await setSessionTokenCookie(sessionToken, session.expiresAt)

    if (!user.emailIsVerified) {
        return redirect({ href: '/verify-email', locale: currentLocale })
    }
    return {
        success: true,
        message: `Wellcome back ${user.username}!`,
    }
}
