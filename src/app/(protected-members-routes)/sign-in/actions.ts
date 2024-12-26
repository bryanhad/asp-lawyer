'use server'

import { createAndSetSessionCookie } from '@/app/(protected-members-routes)/lib/server/auth'
import { UserStatus } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { getZodIssues } from '@/lib/server-utils'
import { User } from '@prisma/client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyPasswordHash } from '../lib/server/password'
import { RefillingTokenBucket, Throttler } from '../lib/server/rate-limit'
import { globalPOSTRateLimit } from '../lib/server/request'
import { createRedirectUrl } from '../lib/server/utils'
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
            const value = formData[key];
            if (typeof value === 'string') {
                fields[key] = value
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

    const userQuery: FetchedUserEntry | undefined = (
        await prisma.$queryRaw<FetchedUserEntry[]>`
        SELECT u."id", u."passwordHash", u."status", u."username", evr."code" AS "emailVerificationCode"
        FROM users u
        LEFT JOIN (
            SELECT "userId", "code", 
                ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "expiresAt" DESC) AS "rank"
            FROM email_verification_requests
            WHERE "expiresAt" > (NOW() AT TIME ZONE 'UTC') + INTERVAL '3 minutes'
        ) evr 
            ON evr."userId" = u."id" AND evr."rank" = 1
        WHERE u."email" = ${email}
    `
    )[0]

    if (!userQuery) {
        return {
            success: false,
            message: 'Account does not exist',
            fields: parsedData.data,
        }
    }

    if (userQuery.status === UserStatus.NOT_VERIFIED) {
        if (userQuery.emailVerificationCode) {
            // await createAndSetSessionCookie(userQuery.id)
            return redirect(
                createRedirectUrl('/verify-emaill', {
                    code: userQuery.emailVerificationCode,
                    toast: 'Verifying email address',
                }),
            )
        }
        return {
            success: false,
            fields: parsedData.data,
            message: 'Please notify the admin to send new verification request',
        }
    }

    if (userQuery.status === UserStatus.ON_BOARDING || !userQuery.passwordHash) {
        await createAndSetSessionCookie(userQuery.id)
        return redirect(
            createRedirectUrl('/on-boarding', {
                uid: userQuery.id.toString(),
                toast: 'Please complete your account',
            }),
        )
    }

    if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    if (!throttler.consume(userQuery.id)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const validPassword = await verifyPasswordHash(userQuery.passwordHash, password)
    if (!validPassword) {
        return {
            fields: parsedData.data,
            success: false,
            message: 'Invalid password',
        }
    }

    throttler.reset(userQuery.id)

    await createAndSetSessionCookie(userQuery.id)
    return redirect(
        createRedirectUrl('/members', {
            toast: `Welcome back ${userQuery.username}!`,
        }),
    )
}

type FetchedUserEntry = Pick<User, 'id' | 'status' | 'passwordHash' | 'username'> & {
    emailVerificationCode: string | null
}
