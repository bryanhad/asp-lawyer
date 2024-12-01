'use server'

import { z } from 'zod'
import { RefillingTokenBucket } from '../../lib/server/rate-limit'
import { globalPOSTRateLimit } from '../../lib/server/request'
import { headers } from 'next/headers'

const ipBucket = new RefillingTokenBucket<string>(3, 10)

export const formSchema = z.object({
    username: z.string().min(5, { message: 'Username has to be atleast 5 characters long' }),
    email: z.string().email({ message: 'Please insert a valid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
})

export type FormData = z.infer<typeof formSchema>

const partialFormSchema = formSchema.partial()
type PartialFormData = z.infer<typeof partialFormSchema>


export async function signupAction({ email, password, username }: PartialFormData): Promise<{ message: string }> {
    if (!globalPOSTRateLimit()) {
        return {
            message: 'Too many requests',
        }
    }

    // TODO: Assumes X-Forwarded-For is always included.
    const clientIP = (await headers()).get('X-Forwarded-For')
    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
        return {
            message: 'Too many requests',
        }
    }

    if (typeof email !== 'string' || typeof username !== 'string' || typeof password !== 'string') {
        return {
            message: 'Invalid or missing fields',
        }
    }
    if (email === '' || password === '' || username === '') {
        return {
            message: 'Please enter your username, email, and password',
        }
    }
    if (!verifyEmailInput(email)) {
        return {
            message: 'Invalid email',
        }
    }
    const emailAvailable = checkEmailAvailability(email)
    if (!emailAvailable) {
        return {
            message: 'Email is already used',
        }
    }
    if (!verifyUsernameInput(username)) {
        return {
            message: 'Invalid username',
        }
    }
    const strongPassword = await verifyPasswordStrength(password)
    if (!strongPassword) {
        return {
            message: 'Weak password',
        }
    }
    if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
        return {
            message: 'Too many requests',
        }
    }
    const user = await createUser(email, username, password)
    const emailVerificationRequest = createEmailVerificationRequest(user.id, user.email)
    sendVerificationEmail(emailVerificationRequest.email, emailVerificationRequest.code)
    setEmailVerificationRequestCookie(emailVerificationRequest)

    const sessionFlags: SessionFlags = {
        twoFactorVerified: false,
    }
    const sessionToken = generateSessionToken()
    const session = createSession(sessionToken, user.id, sessionFlags)
    setSessionTokenCookie(sessionToken, session.expiresAt)
    return redirect('/2fa/setup')
}
