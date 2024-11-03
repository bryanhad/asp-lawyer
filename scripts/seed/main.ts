// scripts/seed/main.ts
import { PrismaClient } from '@prisma/client'
import { EntityType } from '../../src/lib/enum'
import { lawyersSeed } from './data/lawyers'
import { practiceAreaSeed } from './data/practice-areas'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Step 1: Upsert all lawyers concurrently
    console.log(`Seeding 'lawyers' table...`)
    const upsertedLawyers = await Promise.all(
        lawyersSeed.map((data) =>
            prisma.lawyer.upsert({
                where: { slug: data.slug },
                update: {},
                create: {
                    slug: data.slug,
                    order: data.order,
                    name: data.name,
                    linkedInUrl: data.linkedInUrl,
                    email: data.email,
                },
            }),
        ),
    )
    console.log(`Successfully seed 'lawyers' table!`)

    // Step 2: Upsert all practiceAreas concurrently
    console.log(`Seeding 'practice_areas' table...`)
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
    console.log(`Successfully seed 'practice_areas' table!`)

    // Step 3: Collect all translation upserts in a batch
    const translationPromises = []

    // Lawyer Translation batch
    for (const [index, lawyerData] of lawyersSeed.entries()) {
        const lawyerId = upsertedLawyers[index].id

        for (const translationData of lawyerData.translations) {
            translationPromises.push(
                prisma.translation.upsert({
                    where: {
                        entityId_entityType_language_key: {
                            entityId: lawyerId,
                            entityType: EntityType.Lawyer,
                            language: translationData.language,
                            key: translationData.key,
                        },
                    },
                    update: {
                    },
                    create: {
                        entityId: lawyerId,
                        entityType: EntityType.Lawyer,
                        language: translationData.language,
                        key: translationData.key,
                        value: translationData.value,
                    },
                }),
            )
        }
    }
    // PracticeAreas Translation batch
    for (const [index, practiceAreasData] of practiceAreaSeed.entries()) {
        const practiceAreasId = upsertedPracticeAreas[index].id

        for (const translationData of practiceAreasData.translations) {
            translationPromises.push(
                prisma.translation.upsert({
                    where: {
                        entityId_entityType_language_key: {
                            entityId: practiceAreasId,
                            entityType: EntityType.PracticeArea,
                            language: translationData.language,
                            key: translationData.key,
                        },
                    },
                    update: {
                    },
                    create: {
                        entityId: practiceAreasId,
                        entityType: EntityType.PracticeArea,
                        language: translationData.language,
                        key: translationData.key,
                        value: translationData.value,
                    },
                }),
            )
        }
    }

    // Step 4: Execute all translation upserts concurrently
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
