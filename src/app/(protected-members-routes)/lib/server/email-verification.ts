import prisma from '@/lib/prisma'
import { EmailVerificationRequest, Prisma } from '@prisma/client'
import { encodeBase32 } from '@oslojs/encoding'
import { generateRandomOTP } from './utils'
import { cookies } from 'next/headers'
import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { ExpiringTokenBucket } from './rate-limit'

const EMAIL_VERIFICATION_COOKIE = 'email_verification'
const EMAIL_VERIFICATION_EXPIRY = 1000 * 60 * 10 //10 minutes

export async function getUserEmailVerificationRequest(
    userId: number,
    id: string,
): Promise<EmailVerificationRequest | null> {
    const emailVerificationRequest = await prisma.emailVerificationRequest.findUnique({
        where: { id, userId },
    })

    if (!emailVerificationRequest) {
        return null
    }

    return emailVerificationRequest
}

export async function createEmailVerificationRequest(
    tx: Prisma.TransactionClient,
    userId: number,
    email: string,
): Promise<EmailVerificationRequest> {
    // delete existing email verification request if there is any..
    await deleteUserEmailVerificationRequest(tx, userId)
    // create emailVerification id
    const idBytes = new Uint8Array(20)
    crypto.getRandomValues(idBytes)
    const id = encodeBase32(idBytes).toLowerCase()

    const code = generateRandomOTP()
    const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_EXPIRY)

    return await tx.emailVerificationRequest.create({
        data: { id, userId, code, email, expiresAt },
    })
}

export async function deleteUserEmailVerificationRequest(tx: Prisma.TransactionClient, userId: number) {
    await tx.emailVerificationRequest.deleteMany({
        where: { userId },
    })
}

export async function sendVerificationEmail(email: string, code: string) {
    console.log(`To ${email}: Your verification code is ${code}`)
}

export async function setEmailVerificationRequestCookie(request: EmailVerificationRequest) {
    const cookieStore = await cookies()
    cookieStore.set(EMAIL_VERIFICATION_COOKIE, request.id, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: request.expiresAt,
    })
}

export async function deleteEmailVerificationRequestCookie() {
    const cookieStore = await cookies()
    cookieStore.set(EMAIL_VERIFICATION_COOKIE, '', {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
    })
}

export async function getUserEmailVerificationRequestFromRequest(): Promise<EmailVerificationRequest | null> {
    const { user } = await getCurrentSession()
    if (user === null) {
        return null
    }
    const cookieStore = await cookies()
    const id = cookieStore.get(EMAIL_VERIFICATION_COOKIE)?.value ?? null
    if (id === null) {
        return null
    }
    const request = await getUserEmailVerificationRequest(user.id, id)
    if (request === null) {
        await deleteEmailVerificationRequestCookie()
    }
    return request
}

export async function getUserEmailVerificationRequestCode(userId: number): Promise<string | undefined> {
    const res: { code: string } | undefined = (
        await prisma.$queryRaw<{ code: string }[]>`
            SELECT "code" 
            FROM email_verification_requests
            WHERE 
                "expiresAt" > NOW() + INTERVAL '3 minutes'
                AND evr."userId" = ${userId} 
            ORDER BY "expiresAt" DESC
            LIMIT 1
    `
    )[0]
    return res ? res.code : undefined
}

export const sendVerificationEmailBucket = new ExpiringTokenBucket<number>(3, 60 * 10)
