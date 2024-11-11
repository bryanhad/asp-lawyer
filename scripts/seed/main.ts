import { PrismaClient } from '@prisma/client'
import { seedLawyers } from './functions/lawyers'
import { seedPracticeAreas } from './functions/practice-areas'
import {
    seedLawyerTranslations,
    seedPracticeAreaTranslations,
} from './functions/translations'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Step 1: Upsert all lawyers concurrently
    console.log(`Seeding 'lawyers' table...`)
    const upsertedLawyers = await seedLawyers(prisma)
    console.log(`Successfully seed 'lawyers' table!`)

    // Step 2: Upsert all practiceAreas concurrently
    console.log(`Seeding 'practice_areas' table...`)
    const upsertedPracticeAreas = await seedPracticeAreas(prisma)
    console.log(`Successfully seed 'practice_areas' table!`)

    // Lawyer Translation batch
    const lawyerTranslationPromises = await seedLawyerTranslations(
        prisma,
        upsertedLawyers,
    )
    // PracticeAreas Translation batch
    const practiceAreaTranslationPromises = await seedPracticeAreaTranslations(
        prisma,
        upsertedPracticeAreas,
    )
    // Step 3: Execute all translation upserts concurrently
    console.log(`Seeding 'translations' table...`)
    await Promise.all([
        ...lawyerTranslationPromises,
        ...practiceAreaTranslationPromises,
    ])
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
