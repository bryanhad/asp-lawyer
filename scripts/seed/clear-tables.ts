import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Clearing All Tables...')
    await prisma.$transaction(async (tx) => {
        await tx.member.deleteMany()
        console.log(`🏁 Successfully deleted all entries in 'members' table!`)
        await tx.practiceArea.deleteMany()
        console.log(
            `🏁 Successfully deleted all entries in 'practice_areas' table!`,
        )
        await tx.translation.deleteMany()
        console.log(
            `🏁 Successfully deleted all entries in 'translations' table!`,
        )
        await tx.achievements.deleteMany()
        console.log(
            `🏁 Successfully deleted all entries in 'achievements' table!`,
        )
        await tx.blog.deleteMany()
        console.log(`🏁 Successfully deleted all entries in 'blogs' table!`)
    })

    // reset the user_id sequence back to 1.
    await prisma.$executeRaw`ALTER SEQUENCE translations_id_seq RESTART WITH 1;`
}

main()
    .then(async () => {
        await prisma.$disconnect()
        console.log('🎉 Successfully cleared all data on all tables!')
    })
    .catch(async (err) => {
        console.error('😱 Error while clearing tables', err)
        await prisma.$disconnect()
        process.exit(1)
    })
