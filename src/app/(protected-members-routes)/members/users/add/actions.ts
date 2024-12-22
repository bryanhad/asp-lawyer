'use server'

import { checkEmailAvailability } from '@/app/(protected-members-routes)/lib/server/email'
import {
    createEmailVerificationRequest,
    sendVerificationEmail
} from '@/app/(protected-members-routes)/lib/server/email-verification'
import { RefillingTokenBucket } from '@/app/(protected-members-routes)/lib/server/rate-limit'
import { globalPOSTRateLimit } from '@/app/(protected-members-routes)/lib/server/request'
import { UserStatus } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { headers } from 'next/headers'
import { FormData, formSchema } from './validation'
import { logger } from '@/lib/logger'

const ipBucket = new RefillingTokenBucket<string>(3, 10)

export async function addNewUserAction(formData: Partial<FormData>): Promise<{ success: boolean; message: string }> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    // TODO: check if there is session and whether the user is an admin!
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

    const { email } = formDataValidation.data

    const emailAvailable = await checkEmailAvailability(email)
    if (emailAvailable === false) {
        return {
            success: false,
            message: 'User with this email already exists',
        }
    }

    if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }
    // create user (maybe move this to the 'user' server lib)
    try {
        await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                select: { id: true, email: true },
                data: {
                    email,
                    status: UserStatus.NOT_VERIFIED,
                },
            })
            const emailVerificationRequest = await createEmailVerificationRequest(tx, newUser.id, newUser.email)
            logger.info(`CREATED EMAIL VERIFICATION REQUEST:`, emailVerificationRequest)
            // TODO: ACTUALLY SEND AN EMAIL!!
            await sendVerificationEmail(emailVerificationRequest.email, emailVerificationRequest.code)
        })
        // perhaps do something to revalidate client cache for any fetched list of users.. (update it duhh)
        return {
            success: true,
            message: 'Email verification successfully sent'
        }
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            return {
                success: false,
                message: 'Failed to add new user email',
            }
        }
        return {
            success: false,
            message: 'Failed to send verification email',
        }
    }
}
