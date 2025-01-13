'use server'

import {
    getCurrentSession
} from '@/app/(protected-members-routes)/lib/server/auth'
import { UserStatus } from '@/lib/enum'
import { logActionError } from '@/lib/logger'
import prisma from '@/lib/prisma'
import { encryptString } from '../lib/server/encryption'
import { hashPassword, verifyPasswordStrength } from '../lib/server/password'
import { ExpiringTokenBucket, RefillingTokenBucket } from '../lib/server/rate-limit'
import { globalPOSTRateLimit } from '../lib/server/request'
import {
    consumeToken,
    generateRandomRecoveryCode,
    getClientIP,
    isRequestAllowed,
    RedirectUrlArgs,
} from '../lib/server/utils'
import { FormData, formSchema } from './validation'

const tokenBucket = new RefillingTokenBucket<string>('ON_BOARDING_TOKEN_BUCKET', 3, 10)
const expiringTokenBucket = new ExpiringTokenBucket<number>(5, 60 * 30)
const actionName = 'onBoarding Server Action'

type FormState = {
    message: string
    success: boolean
    redirect?: RedirectUrlArgs
}

export async function onBoardingAction(formData: Partial<FormData>): Promise<FormState> {
    const clientIP = await getClientIP()
    if (!globalPOSTRateLimit(clientIP)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    if (isRequestAllowed(tokenBucket, clientIP, 1) === false) {
        logActionError(actionName, 'request is not allowed')
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const { session, user } = await getCurrentSession()
    if (session === null) {
        logActionError(actionName, 'unauthenticated')
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

    if (!expiringTokenBucket.check(user.id, 1)) {
        logActionError(actionName, 'too many requests')
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const formDataValidation = formSchema.safeParse(formData)
    if (!formDataValidation.success) {
        logActionError(actionName, 'missing fields')
        return {
            success: false,
            message: 'Invalid or missing fields',
        }
    }

    const { username, password } = formDataValidation.data

    const isError = consumeToken(tokenBucket, clientIP, 1)
    if (isError) {
        logActionError(actionName, 'consume token error')
        return {
            success: false,
            message: 'Something went wrong',
        }
    }

    const registeredUser = await prisma.user.findUnique({
        select: {
            status: true,
        },
        where: {
            email: user.email,
        },
    })

    if (registeredUser === null || registeredUser.status !== UserStatus.ON_BOARDING) {
        logActionError(actionName, 'unauthorized')
        return {
            success: false,
            message: 'Unauthorized',
        }
    }

    const strongPassword = await verifyPasswordStrength(password)
    if (!strongPassword) {
        logActionError(actionName, 'password is too weak')
        return {
            success: false,
            message: 'Password is too weak',
        }
    }

    try {
        const updatedUser = await prisma.$transaction(async (tx) => {
            const passwordHash = await hashPassword(password)
            const recoveryCode = generateRandomRecoveryCode()
            const encryptedRecoveryCode = encryptString(recoveryCode)
            return await tx.user.update({
                select: { username: true },
                where: { email: user.email },
                data: {
                    status: UserStatus.ACTIVE,
                    username,
                    passwordHash,
                    recoveryCode: Buffer.from(encryptedRecoveryCode), //convert Uint8Array to Buffer
                },
            })
        })
        return {
            success: true,
            message: 'Redirecting to dashboard..',
            redirect: {
                path: '/members',
                params: {
                    toast: `Welcome abroad ${updatedUser.username}!`,
                },
            },
        }
    } catch (err) {
        logActionError(
            actionName,
            err instanceof Error ? err.message : 'Transaction error :( returning error response..',
        )
        return {
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        }
    }
}
