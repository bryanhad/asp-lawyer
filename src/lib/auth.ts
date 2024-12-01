import type { Session } from '@prisma/client'
import crypto from 'crypto'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'
import prisma from './prisma'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { UserInfo } from '@/app/(protected-members-routes)/lib/server/user'

/**
 * Feeling lost? Oh poor future me..
 *
 * Refer to lucia's documentation:
 * https://lucia-auth.com/sessions/basic-api/prisma
 */

export const SESSION_EXPIRY = 1000 * 60 * 60 * 24 * 30 // 30 days
export const SESSION_COOKIE_NAME = 'auth_session'

export type SessionValidationResult = { session: Session; user: UserInfo } | { session: null; user: null }

export type SessionFlags = Pick<Session, 'twoFactorIsVerified'>

/**
 * generates 20 random bytes of string
 * uses
 */
export function generateSessionToken(): string {
    const bytes = crypto.randomBytes(20)
    crypto.getRandomValues(bytes)
    const token = encodeBase32LowerCaseNoPadding(bytes)
    return token
}

export async function createSession(token: string, userId: number, flags: SessionFlags): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + SESSION_EXPIRY),
        isTwoFactorVerified: flags.isTwoFactorVerified,
    }
    await prisma.session.create({
        data: session,
    })
    return session
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const result = await prisma.session.findUnique({
        select: {
            id: true,
            twoFactorIsVerified: true,
            expiresAt: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                    emailIsVerified: true,
                    totpKey: true,
                },
            },
        },
        where: { id: sessionId },
    })

    if (result === null) {
        return { session: null, user: null }
    }

    const { user, ...session } = result

    // if session has expired
    if (Date.now() >= session.expiresAt.getTime()) {
        await prisma.session.delete({ where: { id: sessionId } })
        return { session: null, user: null }
    }

    /**
     * if session has under HALF of SESSION_EXPIRY as it's time to live (15 days in this case..)
     * update the session's time to live
     */
    if (Date.now() >= session.expiresAt.getTime() - SESSION_EXPIRY / 2) {
        session.expiresAt = new Date(Date.now() + SESSION_EXPIRY)
        await prisma.session.update({
            where: { id: session.id },
            data: { expiresAt: session.expiresAt },
        })
    }
    return {
        session,
        user: {
            ...user,
            registered2FA: !!user.totpKey,
        },
    }
}

/**
 * Use invalidate session when:
 * - The user logs out
 * - The user is blocked
 *
 * @param sessionId
 */
export async function invalidateSession(sessionId: string): Promise<void> {
    await prisma.session.delete({ where: { id: sessionId } })
}

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        path: '/', // Cookies can be accessed from all routes
    })
}

export async function deleteSessionTokenCookie(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        path: '/', // Cookies can be accessed from all routes
    })
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null
    if (token === null) {
        return { session: null, user: null }
    }
    const res = await validateSessionToken(token)
    return res
})
