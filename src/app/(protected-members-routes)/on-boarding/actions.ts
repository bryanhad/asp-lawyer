'use server'

import {
    createSession,
    generateSessionToken,
    getCurrentSession,
    setSessionTokenCookie,
} from '@/app/(protected-members-routes)/lib/server/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { checkEmailAvailability } from '../lib/server/email'
import {
    createEmailVerificationRequest,
    sendVerificationEmail,
    setEmailVerificationRequestCookie,
} from '../lib/server/email-verification'
import { verifyPasswordStrength } from '../lib/server/password'
import { ExpiringTokenBucket, RefillingTokenBucket } from '../lib/server/rate-limit'
import { globalPOSTRateLimit } from '../lib/server/request'
import { createUser } from '../lib/server/user'
import { FormData, formSchema } from './validation'
import { getZodIssues } from '@/lib/server-utils'
import prisma from '@/lib/prisma'

const ipBucket = new RefillingTokenBucket<string>(3, 10)
const bucket = new ExpiringTokenBucket<number>(5, 60 * 30)

type FormState = {
    message: string
    success?: boolean
    fields?: Record<string, string> // to re-populate the input fields which is from the client
    issues?: ReturnType<typeof getZodIssues<typeof formSchema>> // to show any input errors from the fromschema
}

export async function onBoardingAction(formData: Partial<FormData>): Promise<FormState> {
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

    const formDataValidation = formSchema.safeParse(formData)
    if (!formDataValidation.success) {
        return {
            success: false,
            message: 'Invalid or missing fields',
        }
    }

    const { username, password, confirmPassword } = formDataValidation.data

    await prisma.user.findUnique({
        select: {
            username:true, passwordHash:true, 
        },
        where: {
            email: user.email
        }
    })

    const emailAvailable = await checkEmailAvailability(email)
    if (emailAvailable === false) {
        return {
            success: false,
            message: 'Email is already used',
        }
    }

    const strongPassword = await verifyPasswordStrength(password)
    if (!strongPassword) {
        return {
            success: false,
            message: 'Password is too weak',
        }
    }
    if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }
    // TODO: SHOULD WE USE TRANSATION HERE?
    const user = await createUser(email, username, password)
    const emailVerificationRequest = await createEmailVerificationRequest(user.id, user.email)
    // TODO: ACTUALLY SEND AN EMAIL!!
    await sendVerificationEmail(emailVerificationRequest.email, emailVerificationRequest.code)
    await setEmailVerificationRequestCookie(emailVerificationRequest)

    const sessionToken = generateSessionToken()
    const session = await createSession(sessionToken, user.id)
    await setSessionTokenCookie(sessionToken, session.expiresAt)
    return redirect('/verify-email')
}
