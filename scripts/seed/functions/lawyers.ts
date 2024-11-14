import { PrismaClient } from '@prisma/client'
import { lawyersSeed } from '../data/lawyers'

export async function seedLawyers(prisma: PrismaClient) {
    const upsertedLawyers = await Promise.all(
        lawyersSeed.map((data) => {
            const imageUrlSplit = data.imageUrl.split('/f/')
            imageUrlSplit.splice(1, 0, `a/${process.env.UPLOADTHING_APP_ID}`)
            const uploadThingImageUrl = imageUrlSplit.join('/')

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
