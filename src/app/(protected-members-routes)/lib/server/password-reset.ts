import { sha256 } from '@oslojs/crypto/sha2'
import { encodeHexLowerCase } from '@oslojs/encoding'
import { PasswordResetSession, Prisma } from '@prisma/client'
import { generateRandomOTP } from './utils'
import { cookies } from 'next/headers'
import { UserInfo } from './user'
import prisma from '@/lib/prisma'

const PASSWORD_RESET_SESSION_COOKIE = 'password_reset_session'
const PASSWORD_RESET_SESSION_EXPIRY = 1000 * 60 * 10 //10 minutes

export type PasswordResetSessionValidationResult =
    | { session: PasswordResetSession; user: UserInfo }
    | { session: null; user: null }

export async function createPasswordResetSession(
    tx: Prisma.TransactionClient,
    token: string,
    userId: number,
    email: string,
): Promise<PasswordResetSession> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const session: PasswordResetSession = {
        id: sessionId,
        userId,
        email,
        expiresAt: new Date(Date.now() + PASSWORD_RESET_SESSION_EXPIRY),
        code: generateRandomOTP(),
        emailIsVerified: false,
    }
    const passwordResetSession = await tx.passwordResetSession.create({
        data: session,
    })
    return passwordResetSession
}

export async function validatePasswordResetSessionToken(token: string): Promise<PasswordResetSessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const res = await prisma.passwordResetSession.findUnique({
        select: {
            id: true,
            userId: true,
            email: true,
            code: true,
            emailIsVerified: true,
            expiresAt: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                    emailIsVerified: true,
                },
            },
        },
        where: { id: sessionId },
    })

    if (!res) {
        return { session: null, user: null }
    }

    const { user, ...session } = res

    if (Date.now() >= session.expiresAt.getTime()) {
        await prisma.passwordResetSession.delete({
            where: { id: session.id },
        })
        return { session: null, user: null }
    }
    return { session, user }
}

export async function invalidateUserPasswordResetSessions(tx: Prisma.TransactionClient, userId: number) {
    await tx.passwordResetSession.deleteMany({
        where: { userId },
    })
}

export async function validatePasswordResetSessionRequest(): Promise<PasswordResetSessionValidationResult> {
    const cookieStore = await cookies()

    const token = cookieStore.get(PASSWORD_RESET_SESSION_COOKIE)?.value ?? null
    if (token === null) {
        return { session: null, user: null }
    }
    const result = await validatePasswordResetSessionToken(token)
    if (result.session === null) {
        await deletePasswordResetSessionTokenCookie()
    }
    return result
}

export async function setPasswordResetSessionTokenCookie(token: string, expiresAt: Date) {
    const cookieStore = await cookies()

    cookieStore.set(PASSWORD_RESET_SESSION_COOKIE, token, {
        expires: expiresAt,
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
    })
}

export async function deletePasswordResetSessionTokenCookie() {
    const cookieStore = await cookies()

	cookieStore.set(PASSWORD_RESET_SESSION_COOKIE, "", {
		maxAge: 0,
		sameSite: "lax",
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production"
	});
}

// TODO: ACTUALLY SEND THE EMAIL
export async function sendPasswordResetEmail(email: string, code: string) {
    console.log(`To ${email}: Your reset code is ${code}`)
}
