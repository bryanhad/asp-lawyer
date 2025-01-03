'use server'

import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { checkEmailAvailability } from '@/app/(protected-members-routes)/lib/server/email'
import {
    createEmailVerificationRequest,
    sendVerificationEmail,
} from '@/app/(protected-members-routes)/lib/server/email-verification'
import { RefillingTokenBucket } from '@/app/(protected-members-routes)/lib/server/rate-limit'
import { globalPOSTRateLimit } from '@/app/(protected-members-routes)/lib/server/request'
import { consumeToken, isRequestAllowed } from '@/app/(protected-members-routes)/lib/server/utils'
import { UserRole, UserStatus } from '@/lib/enum'
import { logAction, logActionError } from '@/lib/logger'
import prisma from '@/lib/prisma'
import { FormData, formSchema } from './validation'

const tokenBucket = new RefillingTokenBucket<string>('ADD_USER_TOKEN_BUCKET', 3, 10)
const actionName = 'addNewUserAction Server Action'

export async function addNewUserAction(formData: Partial<FormData>): Promise<{ success: boolean; message: string }> {
    logAction(actionName, 'start action')
    const { session, user } = await getCurrentSession()

    if (session === null) {
        logActionError(actionName, 'session is null')
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

    if (!globalPOSTRateLimit(session.id)) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    if (isRequestAllowed(tokenBucket, session.id, 1) === false) {
        logActionError(actionName, 'request is not allowed')
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    if (user.role !== UserRole.ADMIN) {
        logActionError(actionName, 'session is not an ADMIN')
        return {
            success: false,
            message: 'Unauthorized Action',
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

    const { email } = formDataValidation.data

    const isError = consumeToken(tokenBucket, session.id, 1)
    if (isError) {
        logActionError(actionName, 'consume token error')
        return {
            success: false,
            message: 'Something went wrong',
        }
    }

    try {
        const emailAvailable = await checkEmailAvailability(email)
        if (emailAvailable === false) {
            logActionError(actionName, 'email is not available')
            return {
                success: false,
                message: 'user with this email already exists',
            }
        }

        await prisma.$transaction(async (tx) => {
            logAction(actionName, 'start transaction..')
            logAction(actionName, 'inserting new user entry to db..')
            const newUser = await tx.user.create({
                select: { id: true, email: true },
                data: {
                    email,
                    status: UserStatus.NOT_VERIFIED,
                    role: UserRole.USER,
                },
            })
            logAction(actionName, 'calling createEmailVerificationRequest..')
            const emailVerificationRequest = await createEmailVerificationRequest(tx, newUser.id, newUser.email)

            // TODO: ACTUALLY SEND AN EMAIL!!
            logAction(actionName, 'calling sendVerificationEmail..')
            await sendVerificationEmail(emailVerificationRequest.email, emailVerificationRequest.code)
        })
        logAction(actionName, 'transaction successful! returning success response..')
        // perhaps do something to revalidate client cache for any fetched list of users.. (update it duhh)
        return {
            success: true,
            message: 'Email verification successfully sent',
        }
    } catch (err) {
        logActionError(
            actionName,
            err instanceof Error ? err.message : 'Transaction error :( returning error response..',
        )
        return {
            success: false,
            message: 'Failed to send verification email',
        }
    }
}
