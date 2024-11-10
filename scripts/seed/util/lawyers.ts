import { PrismaClient } from '@prisma/client'
import { lawyersSeed } from '../data/lawyers'

export async function seedLawyers(prisma: PrismaClient) {
    const upsertedLawyers = await Promise.all(
        lawyersSeed.map((data) =>
            prisma.lawyer.upsert({
                where: { slug: data.slug },
                update: {},
                create: {
                    slug: data.slug,
                    order: data.order,
                    name: data.name,
                    linkedInUrl: data.linkedInUrl,
                    email: data.email,
                },
            }),
        ),
    )
    return upsertedLawyers
}
