'use server'

import { UserStatus } from '@/lib/enum'
import { logger } from '@/lib/logger'
import prisma from '@/lib/prisma'
import { EmailVerificationRequest } from '@prisma/client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createAndSetSessionCookie, getCurrentSession } from '../lib/server/auth'
import {
    createEmailVerificationRequest,
    deleteEmailVerificationRequestCookie,
    deleteUserEmailVerificationRequest,
    getUserEmailVerificationRequestFromRequest,
    sendVerificationEmail,
} from '../lib/server/email-verification'
import { invalidateUserPasswordResetSessions } from '../lib/server/password-reset'
import { ExpiringTokenBucket, RefillingTokenBucket } from '../lib/server/rate-limit'
import { globalPOSTRateLimit } from '../lib/server/request'
import { updateUserEmailAndSetEmailAsVerified, UserInfo } from '../lib/server/user'
import { RedirectUrlArgs } from '../lib/server/utils'

const emailVerificationCodeSchema = z.string().min(8, { message: 'Email verification code is 8-digits' })

const ipBucket = new RefillingTokenBucket<string>(20, 1)
const bucket = new ExpiringTokenBucket<number>(5, 60 * 30)

type FormState = {
    message: string
    success: boolean
    redirect?: RedirectUrlArgs
}

/**
 * This action will handle email verification for 2 cases.
 *  1. A new user which got the link to verify their email (no cookie session available)
 *  2. An active user that wants to change their email (cookie required)
 */
export async function verifyEmailAction(arg: unknown): Promise<FormState> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const { session, user } = await getCurrentSession()

    const parsedData = emailVerificationCodeSchema.safeParse(arg)
    if (!parsedData.success) {
        return { success: false, message: 'Invalid field' }
    }
    const code = parsedData.data

    if (session) {
        // a cookie is required for verifying an email change for an active user
        return await handleEmailVerificationChangeEmail(user, code)
    } else {
        /**
         *  if no session, this should be a verify email action
         *  for a new user
         */
        return await handleEmailVerificationForNewUser(code)
    }
}

type FetchedEmailVerificationRequestEntry = Pick<EmailVerificationRequest, 'code' | 'userId'> & {
    hasExpired: boolean
    userStatus: string
    userEmailIsVerified: boolean
}

async function handleEmailVerificationForNewUser(code: string): Promise<FormState> {
    // TODO: Assumes X-Forwarded-For is always included.
    const headerStore = await headers()
    const clientIP = headerStore.get('X-Forwarded-For')
    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const verificationRequest: FetchedEmailVerificationRequestEntry | undefined = (
        await prisma.$queryRaw<FetchedEmailVerificationRequestEntry[]>`
            SELECT evr."code", evr."userId", u."status" as "userStatus", u."emailIsVerified" as "userEmailIsVerified",
                CASE 
                    WHEN "expiresAt" < (NOW() AT TIME ZONE 'UTC') THEN true
                    ELSE false
                END AS "hasExpired", "expiresAt"
            FROM email_verification_requests evr
            LEFT JOIN users u on u."id" = evr."userId"
            WHERE evr."code" = ${code}
            LIMIT 1
        `
    )[0]

    if (!verificationRequest) {
        return {
            success: false,
            message: 'The verification code has either been used or does not exist',
        }
    }
    logger.info(verificationRequest)
    if (verificationRequest.hasExpired) {
        return {
            success: false,
            message: 'Email verification code has expired.\nPlease notify the admin to send new verification request',
        }
    }
    try {
        await prisma.$transaction(async (tx) => {
            await deleteUserEmailVerificationRequest(tx, verificationRequest.userId)
            /**
             * I don't really know if this check is even necessary
             * since this function function should run only for a new user..
             * The user's status should always be NOT_VERIFIED
             */
            if (verificationRequest.userStatus === UserStatus.NOT_VERIFIED) {
                await tx.user.update({
                    data: {
                        status: UserStatus.ON_BOARDING,
                        emailIsVerified: true,
                    },
                    where: { id: verificationRequest.userId },
                })
            }
        })
        await createAndSetSessionCookie(verificationRequest.userId)
        /**
         * had to handle redirect client side since this action is called
         * client side using useMutation which catches the error..
         * and since nextjs's redirect is using an error behind the scenes.. it won't work properly
         */
        return {
            success: true,
            message: 'Redirecting to on-boarding page..',
            redirect: {
                path: '/on-boarding',
                params: {
                    uid: verificationRequest.userId.toString(),
                    toast: 'Please complete your account',
                },
            },
        }
    } catch (err) {
        logger.error('Error in email verification transaction for NOT_VERIFIED user', err)
        return {
            success: false,
            message: 'An unexpected error occurred.\nPlease try again later.',
        }
    }
}

async function handleEmailVerificationChangeEmail(user: UserInfo, code: string): Promise<FormState> {
    if (!bucket.check(user.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    let verificationRequest = await getUserEmailVerificationRequestFromRequest()
    if (verificationRequest === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

    if (!bucket.consume(user.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    if (Date.now() >= verificationRequest.expiresAt.getTime()) {
        try {
            await prisma.$transaction(async (tx) => {
                verificationRequest = await createEmailVerificationRequest(tx, user.id, user.email)
                await sendVerificationEmail(verificationRequest.email, verificationRequest.code)
                return {
                    success: true,
                    message: 'The verification code was expired. We have sent another code to your inbox.',
                }
            })
        } catch (err) {
            logger.error('Error in email verification transaction', JSON.stringify(err))
            return {
                success: false,
                message:
                    'The verification code was expired, But we failed to create a new one.\nPlease try refreshing the page',
            }
        }
    }
    if (verificationRequest.code !== code) {
        return {
            success: false,
            message: 'Incorrect code.',
        }
    }
    try {
        await prisma.$transaction(async (tx) => {
            await deleteUserEmailVerificationRequest(tx, user.id)
            await invalidateUserPasswordResetSessions(tx, user.id)
            await updateUserEmailAndSetEmailAsVerified(tx, user.id, user.email)
            await deleteEmailVerificationRequestCookie()
        })
    } catch (err) {
        logger.error('Error in email verification transaction', JSON.stringify(err))
        return {
            success: false,
            message: 'An unexpected error occurred.\nPlease try again later.',
        }
    }
    return redirect(`/members?toast=${encodeURIComponent(`Welcome aboard ${user.username}!`)}`)
}
