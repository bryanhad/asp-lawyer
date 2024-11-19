import { PrismaClient } from '@prisma/client'
import { seedLawyerImages } from './functions/images'
import { membersSeed } from './data/members'

const prisma = new PrismaClient()

async function main() {
    const lawyerSlugs = membersSeed.map((l) => l.slug)
    console.log('Seeding lawyer images...')

    const imgUploadResponses = await seedLawyerImages(lawyerSlugs)
    console.log(`UPLOADED ${imgUploadResponses.length} LAWYER IMAGES`)

    // Update each lawyer's imageUrl in the database
    await Promise.all(
        imgUploadResponses.map((img) =>
            prisma.lawyer.update({
                where: { slug: img.slug },
                data: { imageUrl: img.url },
            }),
        ),
    )

    console.log(
        `UPDATED ${imgUploadResponses.length} LAWYER RECORDS WITH IMAGE URLS`,
    )
}

main()
    .catch((e) => {
        console.error('ERROR SEEDING DATABASE:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
