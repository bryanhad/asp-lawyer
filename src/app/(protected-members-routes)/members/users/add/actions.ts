'use server'

import { checkEmailAvailability } from '@/app/(protected-members-routes)/lib/server/email'
import {
    createEmailVerificationRequest,
    sendVerificationEmail
} from '@/app/(protected-members-routes)/lib/server/email-verification'
import { RefillingTokenBucket } from '@/app/(protected-members-routes)/lib/server/rate-limit'
import { globalPOSTRateLimit } from '@/app/(protected-members-routes)/lib/server/request'
import { consumeToken, getClientIP, isIPNotAllowed, isRequestAllowed, isRequestDenied } from '@/app/(protected-members-routes)/lib/server/utils'
import { UserRole, UserStatus } from '@/lib/enum'
import { logger } from '@/lib/logger'
import prisma from '@/lib/prisma'
import { FormData, formSchema } from './validation'
import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'

const tokenBucket = new RefillingTokenBucket<string>('ADD_USER_ACTION', 3, 10)

export async function addNewUserAction(formData: Partial<FormData>): Promise<{ success: boolean; message: string }> {
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

    if (!isRequestAllowed(tokenBucket, session.id, 1)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    if (user.role !== UserRole.ADMIN) {
        return {
            success: false,
            message: 'Unauthorized Action'
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

    const isInsufficient = consumeToken(tokenBucket, session.id, 1)
    if (isInsufficient) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    try {
        const emailAvailable = await checkEmailAvailability(email)
        if (emailAvailable === false) {
            return {
                success: false,
                message: 'User with this email already exists',
            }
        }
        
        await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                select: { id: true, email: true },
                data: {
                    email,
                    status: UserStatus.NOT_VERIFIED,
                    role: UserRole.USER,
                },
            })
            const emailVerificationRequest = await createEmailVerificationRequest(tx, newUser.id, newUser.email)
            // TODO: ACTUALLY SEND AN EMAIL!!
            await sendVerificationEmail(emailVerificationRequest.email, emailVerificationRequest.code)
        })
        // perhaps do something to revalidate client cache for any fetched list of users.. (update it duhh)
        return {
            success: true,
            message: 'Email verification successfully sent'
        }
    } catch (err) {
        return {
            success: false,
            message: 'Failed to send verification email',
        }
    }
}
