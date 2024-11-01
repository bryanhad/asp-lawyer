// scripts/seed/main.ts
import { PrismaClient } from '@prisma/client'
import { lawyers } from './data/lawyers'
import { Language, TranslationKey } from '../../src/lib/enum'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Step 1: Upsert all lawyers concurrently
    console.log(`Seeding 'lawyers' table...`)
    const upsertedLawyers = await Promise.all(
        lawyers.map((lawyerData) =>
            prisma.lawyer.upsert({
                where: { slug: lawyerData.slug },
                update: {},
                create: {
                    slug: lawyerData.slug,
                    order: lawyerData.order,
                    name: lawyerData.name,
                    linkedInUrl: lawyerData.linkedInUrl,
                    email: lawyerData.email,
                },
            }),
        ),
    )
    console.log(`Successfully seed 'lawyers' table!`)

    // Step 2: Collect all translation upserts in a batch
    const translationPromises = []

    for (const [index, lawyerData] of lawyers.entries()) {
        const lawyerId = upsertedLawyers[index].id

        for (const translationData of lawyerData.translations) {
            translationPromises.push(
                prisma.translation.upsert({
                    where: {
                        lawyerId_language_key: {
                            lawyerId,
                            language: translationData.language as Language,
                            key: translationData.key as TranslationKey,
                        },
                    },
                    update: {
                        value: translationData.value,
                    },
                    create: {
                        lawyerId,
                        language: translationData.language as Language,
                        key: translationData.key as TranslationKey,
                        value: translationData.value,
                    },
                }),
            )
        }
    }

    // Step 3: Execute all translation upserts concurrently
    console.log(`Seeding 'translations' table...`)
    await Promise.all(translationPromises)
    console.log(`Successfully seed 'translations' table!`)
}

main()
    .then(() => {
        console.log('SEEDING DATABASE COMPLETED')
    })
    .catch((e) => {
        console.error('ERROR SEEDING DATABASE:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
