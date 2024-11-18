import { PrismaClient } from '@prisma/client'
import { lawyersSeed } from '../data/lawyers'
import { getPrivateUrl } from './util'

export async function seedLawyers(prisma: PrismaClient) {
    const upsertedLawyers = await Promise.all(
        lawyersSeed.map((data) => {
            const uploadThingImageUrl = getPrivateUrl(data.imageUrl)

            return prisma.lawyer.upsert({
                where: { slug: data.slug },
                update: {},
                create: {
                    slug: data.slug,
                    order: data.order,
                    name: data.name,
                    imageUrl: uploadThingImageUrl,
                    linkedInUrl: data.linkedInUrl,
                    email: data.email,
                },
            })
        }),
    )
    return upsertedLawyers
}
