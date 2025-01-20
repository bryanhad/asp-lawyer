'use server'

import prisma from '@/lib/prisma';
import { Member, Prisma } from '@prisma/client';

export type SearchParams = { size?: number; page?: number; q?: string }

type FetchedMemberEntry = Pick<Member, 'id' | 'name' | 'role' | 'order' | 'email' | 'imageUrl' | 'slug' | "createdAt"> & {
    inputor: {
        id: number
        username:string
    }
    editor: {
        id: number
        username:string
    } | null
}

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
    members: FetchedMemberEntry[]
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

    const [membersQueryRes, countRes] = await Promise.all([
        prisma.$queryRaw<FetchedMemberEntry[]>`
            SELECT 
                m."id", m."name", m."role", m."order", m."email", m."imageUrl", m."slug",
                m."createdAt",
                -- get inputor details
                jsonb_build_object(
                    'id', inputor."id",
                    'username', inputor."username"
                ) AS inputor,
                -- get editor details (returns null if no editor is found)
                jsonb_build_object(
                    'id', editor."id",
                    'username', editor."username"
                ) AS editor
            FROM members m
            LEFT JOIN users inputor
                ON inputor."id" = m."inputorId"
            LEFT JOIN users editor
                ON editor."id" = m."editorId"
            ${
                searchString
                    ? Prisma.sql`WHERE 
                        m."name" ILIKE ${`%${searchString}%`}
                            OR
                        inputor."username" ILIKE ${`%${searchString}%`}
                    `
                    : Prisma.empty
            }
            ORDER BY m."createdAt"
            LIMIT ${fetchSize} OFFSET ${offset}
        `,
        prisma.$queryRaw<{ count: number }[]>`SELECT COUNT(*) as count FROM members`,
    ])

    const totalDataCount = Number(countRes[0].count)
    const totalAvailablePages = Math.ceil(Number(totalDataCount) / fetchSize)
    return {
        members: membersQueryRes,
        fetchDetail: {
            totalDataCount,
            totalAvailablePages,
            isUsingFilter,
            fetchSize,
            fetchedDataCount: membersQueryRes.length,
            currentPage,
        },
    }
}
