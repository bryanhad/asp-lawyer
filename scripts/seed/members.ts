import { PrismaClient } from '@prisma/client'
import {
    seedMemberTranslations
} from './functions/translations'
import { seedMembers } from './functions/members'

const prisma = new PrismaClient()

async function main() {
    await prisma.$transaction(
        async (tx) => {
            // Step 1: Upsert all lawyers concurrently
            console.log(`🚀 Seeding 'members' table...`)
            const upsertedLawyers = await seedMembers(tx)
            console.log(`🏁 Successfully seed 'members' table!`)

            // Lawyer Translation batch
            console.log(`🚀 Seeding member's translations...`)
            await seedMemberTranslations(tx, upsertedLawyers)
            console.log(`🏁 Successfully seed member's translations!`)
        },
        {
            maxWait: 5000, // 5 seconds max wait to connect to prisma
            timeout: 210000, // 3.5 minutes
        },
    )
}

main()
    .then(() => {
        console.log('🎉 SEEDING MEMBERS COMPLETED')
    })
    .catch((e) => {
        console.error('😱 ERROR SEEDING MEMBERS:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
