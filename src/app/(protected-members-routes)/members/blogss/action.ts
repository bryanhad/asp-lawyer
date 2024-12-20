'use server'

import { BlogTranslationKey, EntityType, Language } from '@/lib/enum'
import { logger } from '@/lib/logger'
import prisma from '@/lib/prisma'
import { getBlurredImageUrls } from '@/lib/server-utils'
import { Blog, Prisma, User } from '@prisma/client'

export type SearchParams = { size?: number; page?: number; q?: string }

type FetchedBlogEntry = Pick<Blog, 'id' | 'imageUrl' | 'createdAt'> & {
    title: { id: string; en: string }
    author: Pick<User, 'id' | 'username'>
}

type BlogData = FetchedBlogEntry & {
    blurImageUrl: string | null
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
    createdByUserId: _createdByUserId,
}: Partial<{
    filterValues: SearchParams
    createdByUserId: string
}> = {}): Promise<{
    blogs: BlogData[]
    fetchDetail: FetchDetail
}> {
    logger.info('getData called')
    const { q, page, size } = filterValues ?? {}
    const isUsingFilter = !!q
    const currentPage = page || 1
    const fetchSize = size || 5

    const searchString = q
        ?.split(' ')
        .filter((word) => word.length > 0)
        .join(' ')

    const offset = (currentPage - 1) * fetchSize

    const [query, countRes] = await Promise.all([
        prisma.$queryRaw<FetchedBlogEntry[]>`
             SELECT 
            b."id", b."imageUrl", b."createdAt", 
            -- get author details
            jsonb_build_object(
                'id', u."id",
                'username', u."username"
            ) AS author,
            -- get title: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.TITLE} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.TITLE} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS title
            FROM blogs b
            LEFT JOIN translations AS t 
                ON t."entityId" = b."id" 
                AND t."entityType" = ${EntityType.BLOG}
                AND t."key" IN (${BlogTranslationKey.TITLE})
            LEFT JOIN users u
                ON u."id" = b."authorId"
            ${
                searchString
                    ? Prisma.sql`WHERE 
                        EXISTS (
                            SELECT 1 FROM translations sub_t
                            WHERE sub_t."entityId" = b."id"
                                AND sub_t."entityType" = ${EntityType.BLOG}
                                AND sub_t."key" = ${BlogTranslationKey.TITLE}
                                AND sub_t."value" ILIKE ${`%${searchString}%`}
                        ) OR
                        u."username" ILIKE ${`%${searchString}%`}
                    `
                    : Prisma.empty
            }
            GROUP BY b."id", b."imageUrl", b."createdAt", u."id"
            LIMIT ${fetchSize} OFFSET ${offset}
        `,
        prisma.$queryRaw<{ count: number }[]>`SELECT COUNT(*) as count FROM blogs b`,
    ])

    // Step 1: Collect image URLs
    const imageUrls = query.map((blog) => blog.imageUrl)
    // Step 2: Get blurred images for all URLs concurrently
    const blurredImageUrls = await getBlurredImageUrls(imageUrls)
    // // Step 3: Transform lawyers data, including blurred images
    const transformedBlog = query.map((blog, i) => {
        const result = {
            ...blog,
            imageUrl: imageUrls[i],
            blurImageUrl: blurredImageUrls[i],
        }
        return result
    })

    const totalDataCount = Number(countRes[0].count)
    const totalAvailablePages = Math.ceil(Number(totalDataCount) / fetchSize)
    logger.info('returning getData result')
    return {
        blogs: transformedBlog,
        fetchDetail: {
            totalDataCount,
            totalAvailablePages,
            isUsingFilter,
            fetchSize,
            fetchedDataCount: transformedBlog.length,
            currentPage
        }
    }
}


export async function getInitialData(): Promise<{
    blogs: BlogData[]
    fetchDetail: FetchDetail
}> {
    logger.info('getInitialData called')

    const currentPage = 1
    const fetchSize = 5


    const [query, countRes] = await Promise.all([
        prisma.$queryRaw<FetchedBlogEntry[]>`
             SELECT 
            b."id", b."imageUrl", b."createdAt", 
            -- get author details
            jsonb_build_object(
                'id', u."id",
                'username', u."username"
            ) AS author,
            -- get title: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.TITLE} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.TITLE} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS title
            FROM blogs b
            LEFT JOIN translations AS t 
                ON t."entityId" = b."id" 
                AND t."entityType" = ${EntityType.BLOG}
                AND t."key" IN (${BlogTranslationKey.TITLE})
            LEFT JOIN users u
                ON u."id" = b."authorId"
            GROUP BY b."id", b."imageUrl", b."createdAt", u."id"
            LIMIT ${fetchSize}
        `,
        prisma.$queryRaw<{ count: number }[]>`SELECT COUNT(*) as count FROM blogs b`,
    ])

    // Step 1: Collect image URLs
    const imageUrls = query.map((blog) => blog.imageUrl)
    // Step 2: Get blurred images for all URLs concurrently
    const blurredImageUrls = await getBlurredImageUrls(imageUrls)
    // // Step 3: Transform lawyers data, including blurred images
    const transformedBlog = query.map((blog, i) => {
        const result = {
            ...blog,
            imageUrl: imageUrls[i],
            blurImageUrl: blurredImageUrls[i],
        }
        return result
    })

    const totalDataCount = Number(countRes[0].count)
    const totalAvailablePages = Math.ceil(Number(totalDataCount) / fetchSize)
    logger.info('returning getInitialData result')
    return {
        blogs: transformedBlog,
        fetchDetail: {
            totalDataCount,
            totalAvailablePages,
            isUsingFilter:false,
            fetchSize,
            fetchedDataCount: transformedBlog.length,
            currentPage
        }
    }
}
