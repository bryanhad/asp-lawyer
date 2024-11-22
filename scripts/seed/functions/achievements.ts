import { Prisma } from '@prisma/client'
import { achievementsSeed } from '../data/achievements'
import { getPrivateUrl } from './util'

export async function seedAchievements(prisma: Prisma.TransactionClient) {
    const upsertedAchievements = await Promise.all(
        achievementsSeed.map((data) => {
            const uploadThingImageUrl = getPrivateUrl(data.imageUrl)

            return prisma.achievements.upsert({
                where: { order: data.order },
                update: {},
                create: {
                    order: data.order,
                    imageUrl: uploadThingImageUrl,
                },
            })
        }),
    )
    return upsertedAchievements
}
