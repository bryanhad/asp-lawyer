import { PrismaClient } from '@prisma/client'
import { practiceAreaSeed } from '../data/practice-areas'

export async function seedPracticeAreas(prisma: PrismaClient) {
    const upsertedPracticeAreas = await Promise.all(
        practiceAreaSeed.map((data) =>
            prisma.practiceArea.upsert({
                where: { slug: data.slug },
                update: {},
                create: {
                    slug: data.slug,
                    order: data.order,
                },
            }),
        ),
    )
    return upsertedPracticeAreas
}
