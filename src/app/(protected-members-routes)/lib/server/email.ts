import prisma from '@/lib/prisma'

export async function checkEmailAvailability(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        select: { email: true },
        where: { email },
    })
    return user === null
}
