import { Prisma } from '@prisma/client'

export async function invalidateUserPasswordResetSessions(tx: Prisma.TransactionClient, userId: number) {
    await tx.passwordResetSession.deleteMany({
        where: { userId },
    })
}
