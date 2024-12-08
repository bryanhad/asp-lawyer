import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.$transaction(
        async (tx) => {
            console.log('🚀 Seeding dummy users...')

        },
        {
            maxWait: 5000, // 5 seconds max wait to connect to prisma
            timeout: 60000, // 60 seconds
        },
    )
}

main()
    .then(() => {
        console.log('🎉 SEEDING DUMMY USERS COMPLETED')
    })
    .catch((e) => {
        console.error('😱 ERROR SEEDING DUMMY USERS:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
