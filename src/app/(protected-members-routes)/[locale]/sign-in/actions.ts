'use server'

import { redirect } from '@/i18n/routing'
import { createSession, generateSessionToken, setSessionTokenCookie } from '@/lib/auth'
import { getCurrentLocale, getZodIssues, verifyLocale } from '@/lib/server-utils'
import { headers } from 'next/headers'
import { verifyPasswordHash } from '../../lib/server/password'
import { RefillingTokenBucket, Throttler } from '../../lib/server/rate-limit'
import { globalPOSTRateLimit } from '../../lib/server/request'
import { getUserFromEmail, getUserPasswordHash } from '../../lib/server/user'
import { formSchema } from './validation'

const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300])
const ipBucket = new RefillingTokenBucket<string>(20, 1)

type FormState = {
    message: string
    success?: boolean
    fields?: Record<string, string> // to re-populate the input fields which is from the client
    issues?: ReturnType<typeof getZodIssues<typeof formSchema>> // to show any input errors from the fromschema
}

export async function loginAction(_prevState: FormState, data: FormData): Promise<FormState> {
    if (!globalPOSTRateLimit()) {
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
        return {
            success: false,
            message: 'Missing locale',
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

    const { email, password } = parsedData.data

    const user = await getUserFromEmail(email)
    if (user === null) {
        return {
            success: false,
            message: 'Account does not exist',
            fields: parsedData.data,
        }
    }

    if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    if (!throttler.consume(user.id)) {
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
            message: 'Invalid User',
        }
    }
    const validPassword = await verifyPasswordHash(passwordHash, password)
    if (!validPassword) {
        return {
            fields: parsedData.data,
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

    return redirect({ href: `/members?toast=${encodeURIComponent(`Welcome back ${user.username}!`)}`, locale: currentLocale })
}
