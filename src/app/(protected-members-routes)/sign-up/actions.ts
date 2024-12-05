'use server'

import { createSession, generateSessionToken, setSessionTokenCookie } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { checkEmailAvailability } from '../lib/server/email'
import {
    createEmailVerificationRequest,
    sendVerificationEmail,
    setEmailVerificationRequestCookie,
} from '../lib/server/email-verification'
import { verifyPasswordStrength } from '../lib/server/password'
import { RefillingTokenBucket } from '../lib/server/rate-limit'
import { globalPOSTRateLimit } from '../lib/server/request'
import { createUser } from '../lib/server/user'
import { FormData, formSchema } from './validation'

const ipBucket = new RefillingTokenBucket<string>(3, 10)

export async function signupAction(formData: Partial<FormData>): Promise<{ success: boolean; message: string }> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    // TODO: Assumes X-Forwarded-For is always included.
    const clientIP = (await headers()).get('X-Forwarded-For')
    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
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

    // if (typeof email !== 'string' || typeof username !== 'string' || typeof password !== 'string') {
    //     return {
    //         message: 'Invalid or missing fields',
    //     }
    // }
    // if (email === '' || password === '' || username === '') {
    //     return {
    //         message: 'Please enter your username, email, and password',
    //     }
    // }
    // if (!verifyEmailInput(email)) {
    //     return {
    //         message: 'Invalid email',
    //     }
    // }
    const { email, password, username } = formDataValidation.data

    const emailAvailable = await checkEmailAvailability(email)
    if (emailAvailable === false) {
        return {
            success: false,
            message: 'Email is already used',
        }
    }
    // if (!verifyUsernameInput(username)) {
    //     return {
    //         message: 'Invalid username',
    //     }
    // }
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
