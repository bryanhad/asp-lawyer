import { PrismaClient } from '@prisma/client'
import { getPrivateUrl } from './util'
import { achievementsSeed } from '../data/achievements'

export async function seedAchievements(prisma: PrismaClient) {
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
