import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.$transaction(async (tx) => {
        await tx.lawyer.deleteMany()
        await tx.practiceArea.deleteMany()
        await tx.translation.deleteMany()
    })
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
