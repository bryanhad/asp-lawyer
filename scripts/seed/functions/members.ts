import { PrismaClient } from '@prisma/client'
import { membersSeed } from '../data/members'
import { getPrivateUrl } from './util'

export async function seedMembers(prisma: PrismaClient) {
    const upsertedLawyers = await Promise.all(
        membersSeed.map((data) => {
            const uploadThingImageUrl = getPrivateUrl(data.imageUrl)

            return prisma.member.upsert({
                where: { slug: data.slug },
                update: {},
                create: {
                    slug: data.slug,
                    order: data.order,
                    name: data.name,
                    imageUrl: uploadThingImageUrl,
                    linkedInUrl: data.linkedInUrl,
                    email: data.email,
                    role: data.role,
                },
            })
        }),
    )
    return upsertedLawyers
}
