'use server'

import { BlogTranslationKey, EntityType, Language } from '@/lib/enum'
import { logger } from '@/lib/logger'
import prisma from '@/lib/prisma'
import { getBlurredImageUrls } from '@/lib/server-utils'
import { Blog } from '@prisma/client'

type BlogWithTranslations = Pick<Blog, 'id' | 'createdAt' | 'imageUrl'> & {
    title: { id: string; en: string }
}

export type BlogCardData = BlogWithTranslations & {
    blurImageUrl: string
}

export async function getData(): Promise<BlogCardData[]> {
    try {
        const query: BlogWithTranslations[] = await prisma.$queryRaw`
            SELECT 
                b."id", b."createdAt", b."imageUrl",
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
            FROM blogs AS b
            LEFT JOIN translations AS t 
                ON b."id" = t."entityId"
                AND t."entityType" = ${EntityType.BLOG}
                AND t."key" IN (${BlogTranslationKey.TITLE})
            GROUP BY b."id", b."createdAt", b."imageUrl"
            ORDER BY b."createdAt" DESC
        `

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

        return transformedBlog
    } catch (err) {
        logger.error(err)
        throw new Error('Internal Server Error')
    }
}
