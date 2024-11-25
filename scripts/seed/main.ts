import { PrismaClient } from '@prisma/client'
import { seedAchievements } from './functions/achievements'
import { seedPracticeAreas } from './functions/practice-areas'
import {
    seedAchievementTranslations,
    seedPracticeAreaTranslations,
} from './functions/translations'

const prisma = new PrismaClient()

async function main() {
    await prisma.$transaction(
        async (tx) => {
            console.log('Seeding database...')

            // Step 2: Upsert all practiceAreas concurrently
            console.log(`🚀 Seeding 'practice_areas' table...`)
            const upsertedPracticeAreas = await seedPracticeAreas(tx)
            console.log(`🏁 Successfully seed 'practice_areas' table!`)

            // Step 3: Upsert all practiceAreas concurrently
            console.log(`🚀 Seeding 'achievements' table...`)
            const upsertedAchievements = await seedAchievements(tx)
            console.log(`🏁 Successfully seed 'achievements' table!`)
            
            // PracticeAreas Translation batch
            console.log(`🚀 Seeding 'practice_areas' translations...`)
            await seedPracticeAreaTranslations(tx, upsertedPracticeAreas)
            console.log(`🏁 Successfully seed 'practice_areas' translations!`)
            
            // Achievements Translation batch
            console.log(`🚀 Seeding 'achievments' translations...`)
            await seedAchievementTranslations(tx, upsertedAchievements)
            console.log(`🏁 Successfully seed 'achievements' translations!`)
        },
        {
            maxWait: 5000, // 5 seconds max wait to connect to prisma
            timeout: 60000, // 60 seconds
        },
    )
}

main()
    .then(() => {
        console.log('🎉 SEEDING DATABASE COMPLETED')
    })
    .catch((e) => {
        console.error('😱 ERROR SEEDING DATABASE:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
