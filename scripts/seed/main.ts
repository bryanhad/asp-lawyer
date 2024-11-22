import { PrismaClient } from '@prisma/client'
import { seedMembers } from './functions/members'
import { seedPracticeAreas } from './functions/practice-areas'
import {
    seedAchievementTranslations,
    seedMemberTranslations,
    seedPracticeAreaTranslations,
} from './functions/translations'
import { seedAchievements } from './functions/achievements'

const prisma = new PrismaClient()

async function main() {
    await prisma.$transaction(async (tx) => {
        console.log('Seeding database...')

        // Step 1: Upsert all lawyers concurrently
        console.log(`Seeding 'lawyers' table...`)
        const upsertedLawyers = await seedMembers(tx)
        console.log(`Successfully seed 'lawyers' table!`)

        // Step 2: Upsert all practiceAreas concurrently
        console.log(`Seeding 'practice_areas' table...`)
        const upsertedPracticeAreas = await seedPracticeAreas(tx)
        console.log(`Successfully seed 'practice_areas' table!`)

        // Step 3: Upsert all practiceAreas concurrently
        console.log(`Seeding 'achievements' table...`)
        const upsertedAchievements = await seedAchievements(tx)
        console.log(`Successfully seed 'achievements' table!`)

        // Lawyer Translation batch
        const lawyerTranslationPromises = await seedMemberTranslations(
            tx,
            upsertedLawyers,
        )
        // PracticeAreas Translation batch
        const practiceAreaTranslationPromises =
            await seedPracticeAreaTranslations(tx, upsertedPracticeAreas)

        // Achievements Translation batch
        const achievementTranslationPromises =
            await seedAchievementTranslations(tx, upsertedAchievements)

        // Step 3: Execute all translation upserts concurrently
        console.log(`Seeding 'translations' table...`)
        await Promise.all([
            ...lawyerTranslationPromises,
            ...practiceAreaTranslationPromises,
            ...achievementTranslationPromises,
        ])
        console.log(`Successfully seed 'translations' table!`)
    })
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
