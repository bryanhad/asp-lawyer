'use server'

import { Prisma, User } from '@prisma/client'
import { hashPassword } from './password'
import { generateRandomRecoveryCode } from './utils'
import { encryptString } from './encryption'
import prisma from '@/lib/prisma'

export type UserInfo = Pick<User, 'id' | 'email' | 'username' | 'emailIsVerified'>

export async function createUser(email: string, username: string, password: string): Promise<UserInfo> {
    const passwordHash = await hashPassword(password)
    const recoveryCode = generateRandomRecoveryCode()
    const encryptedRecoveryCode = encryptString(recoveryCode)

    const user = await prisma.user.create({
        select: { id: true, username: true, email: true, emailIsVerified: true },
        data: {
            email,
            username,
            passwordHash,
            recoveryCode: Buffer.from(encryptedRecoveryCode), //convert Uint8Array to Buffer
        },
    })

    return user
}

export async function updateUserPassword(tx: Prisma.TransactionClient, userId: number, password: string) {
    const passwordHash = await hashPassword(password)
    await tx.user.update({
        data: { passwordHash },
        where: { id: userId },
    })
}

export async function getUserPasswordHash(userId: number): Promise<string | null> {
    const user = await prisma.user.findUnique({ select: { passwordHash: true }, where: { id: userId } })
    if (!user) {
        return null
    }
    return user.passwordHash
}

export async function updateUserEmailAndSetEmailAsVerified(
    tx: Prisma.TransactionClient,
    userId: number,
    email: string,
) {
    await tx.user.update({
        data: {
            email,
            emailIsVerified: true,
        },
        where: { id: userId },
    })
}

export async function getUserFromEmail(email: string): Promise<UserInfo | null> {
    return await prisma.user.findUnique({
        select: { id: true, username: true, email: true, emailIsVerified: true },
        where: { email },
    })
}
