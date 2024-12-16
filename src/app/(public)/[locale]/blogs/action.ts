'use server'

import { BlogTranslationKey, EntityType, Language } from '@/lib/enum'
import { logger } from '@/lib/logger'
import prisma from '@/lib/prisma'
import { getBlurredImageUrls } from '@/lib/server-utils'
import { Blog, Prisma } from '@prisma/client'

type FetchedBlogEntry = Pick<Blog, 'id' | 'imageUrl' | 'createdAt'> & {
    title: { id: string; en: string }
}

export type BlogCardData = FetchedBlogEntry & {
    blurImageUrl: string | null
}

/**
 * Fetches paginated blog entries from the database along with their translations.
 *
 * ### Description
 * This function performs a paginated query to fetch blog entries and their associated translations.
 * It supports cursor-based pagination using the `createdAt` column of the `blogs` table.
 * If a `cursor` is provided, the query fetches blogs with `createdAt` values <= to the cursor (fetch older blogs).
 * If no `cursor` is provided, it fetches the latest blogs (fetch newest blogs).
 *
 * ### Query Highlights
 * - Fetches a maximum of `fetchSize + 1` rows to determine if there are more results for pagination.
 * - Joins the `translations` table to retrieve localized blog titles in `id` (Indonesian) and `en` (English).
 * - Uses conditional SQL logic to handle the `cursor` parameter:
 *   - If `cursor` is not null, it filters by `b."createdAt" <= ${cursor.toISOString()}::timestamp`.
 *   - If `cursor` is null, it fetches the latest blogs without a `WHERE` condition.
 *
 * ### Why Use `::timestamp`
 * PostgreSQL requires explicit type casting for ISO date strings when comparing with `timestamp` columns.
 * Adding `::timestamp` ensures proper comparison and avoids type mismatch errors.
 *
 * @param cursor The `Date` object representing the pagination cursor. Pass `null` for the first fetch.
 * @returns A promise resolving to an object containing:
 * - `blogs`: An array of `FetchedBlogEntry` objects (up to `fetchSize`).
 * - `nextCursor`: The `createdAt` value of the last blog in the current page, or `null` if no more results.
 */
export async function getData(cursor: Date | null): Promise<{
    blogs: Array<BlogCardData>
    nextCursor: Date | null
}> {
    try {
        const fetchSize = 6 // Number of blogs to fetch per page (per load)

        const query = await prisma.$queryRaw<FetchedBlogEntry[]>`
        SELECT 
            b."id", b."imageUrl", b."createdAt", 
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
        ${cursor ? Prisma.sql`WHERE b."createdAt" <= ${cursor.toISOString()}::timestamp` : Prisma.empty}
        GROUP BY b."id", b."imageUrl", b."createdAt"
        ORDER BY b."createdAt" DESC
        LIMIT ${fetchSize + 1}
    `
        const blogsBasedOnFetchSize = query.slice(0, fetchSize)

        const imageUrls = blogsBasedOnFetchSize.map((blog) => blog.imageUrl)

        // Step 2: Get blurred images for all URLs concurrently
        const blurredImageUrls = await getBlurredImageUrls(imageUrls)

        // // Step 3: Transform lawyers data, including blurred images
        const transformedBlog = blogsBasedOnFetchSize.map((blog, i) => {
            const result = {
                ...blog,
                imageUrl: imageUrls[i],
                blurImageUrl: blurredImageUrls[i],
            }
            return result
        })

        // Determine the next cursor for pagination
        const nextCursor = query.length > fetchSize ? query[fetchSize].createdAt : null

        return {
            blogs: transformedBlog, // Return only the requested number of blogs (based on the fetchSize)
            nextCursor, // Cursor for the next fetch
        }
    } catch (err) {
        logger.error(err)
        throw new Error('Internal Server Error')
    }
}
