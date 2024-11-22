import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.$transaction(async (tx) => {
        await tx.member.deleteMany()
        await tx.practiceArea.deleteMany()
        await tx.translation.deleteMany()
        await tx.achievements.deleteMany()
        await tx.blog.deleteMany()
    })

    // reset the user_id sequence back to 1.
    await prisma.$executeRaw`ALTER SEQUENCE translations_id_seq RESTART WITH 1;`
}

main()
    .then(async () => {
        await prisma.$disconnect()
        console.log('Successfully cleared all data on all tables!')
    })
    .catch(async (err) => {
        console.error('Error while clearing tables', err)
        await prisma.$disconnect()
        process.exit(1)
    })
