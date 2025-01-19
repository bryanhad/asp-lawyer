'use server'

import prisma from '@/lib/prisma'
import { Member, Prisma, User } from '@prisma/client'

export type SearchParams = { size?: number; page?: number; q?: string }

type FetchedUserEntry = Pick<Member, 'id' | 'name' | 'role' | 'order' | 'email' | 'imageUrl' | 'slug'>

export type FetchDetail = {
    totalDataCount: number
    totalAvailablePages: number
    isUsingFilter: boolean
    fetchSize: number
    fetchedDataCount: number
    currentPage: number
}

export async function getData({
    filterValues,
}: Partial<{
    filterValues: SearchParams
    createdByUserId: string
}> = {}): Promise<{
    users: FetchedUserEntry[]
    fetchDetail: FetchDetail
}> {
    const { q, page, size } = filterValues ?? {}
    const isUsingFilter = !!q
    const currentPage = page || 1
    const fetchSize = size || 5

    const searchString = q
        ?.split(' ')
        .filter((word) => word.length > 0)
        .join(' ')

    const offset = (currentPage - 1) * fetchSize

    const [usersQueryRes, countRes] = await Promise.all([
        prisma.$queryRaw<FetchedUserEntry[]>`
            SELECT 
                u."id", u."email", u."username", u."emailIsVerified", u."status",
                COUNT(b."id") as blog_count
            FROM users u
            LEFT JOIN blogs b
                ON b."authorId" = u."id"
            ${
                searchString
                    ? Prisma.sql`WHERE 
                        u."username" ILIKE ${`%${searchString}%`}
                    `
                    : Prisma.empty
            }
            GROUP BY u."id", u."email", u."username", u."emailIsVerified"
            ORDER BY u."id"
            LIMIT ${fetchSize} OFFSET ${offset}
        `,
        prisma.$queryRaw<{ count: number }[]>`SELECT COUNT(*) as count FROM users`,
    ])

    const users = usersQueryRes.map(user => ({
        ...user,
        blog_count: Number(user.blog_count)
    }))

    const totalDataCount = Number(countRes[0].count)
    const totalAvailablePages = Math.ceil(Number(totalDataCount) / fetchSize)
    return {
        users,
        fetchDetail: {
            totalDataCount,
            totalAvailablePages,
            isUsingFilter,
            fetchSize,
            fetchedDataCount: users.length,
            currentPage,
        },
    }
}
