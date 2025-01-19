import { Prisma } from '@prisma/client'
import { membersSeed } from '../data/members'
import { getPrivateUrl } from './util'

export async function seedMembers(prisma: Prisma.TransactionClient) {
    const upsertedLawyers = await Promise.all(
        membersSeed.map((data) => {
            const uploadThingImageUrl = getPrivateUrl(data.imageUrl)
            let inputorId = 1 // admin's user 
            let editorId = null

            const inputedBySiPalingKurator = ['betti', 'faras', 'richard']
            if (inputedBySiPalingKurator.includes(data.slug)) {
                inputorId = 3 // sipaling kurator's user id
            }

            const hasEditor = ['arif', 'herlin', 'richard', 'ratna']
            if (hasEditor.includes(data.slug)) {
                if (data.slug === 'herlin' || data.slug === 'ratna') {
                    editorId = 3
                } else {
                    editorId = 1
                }
            }

            return prisma.member.upsert({
                where: { slug: data.slug },
                update: {},
                create: {
                    slug: data.slug,
                    order: data.order,
                    name: data.name,
                    inputorId,
                    editorId,
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
