import { Prisma } from '@prisma/client'
import { practiceAreaSeed } from '../data/practice-areas'
import { getPrivateUrl } from './util'

export async function seedPracticeAreas(prisma: Prisma.TransactionClient) {
    const upsertedPracticeAreas = await Promise.all(
        practiceAreaSeed.map((data) => {
            const uploadThingImageUrl = getPrivateUrl(data.imageUrl)

            return prisma.practiceArea.upsert({
                where: { slug: data.slug },
                update: {},
                create: {
                    slug: data.slug,
                    order: data.order,
                    imageUrl: uploadThingImageUrl,
                },
            })
        }),
    )
    return upsertedPracticeAreas
}
