'use server'

import { BlogTranslationKey, EntityType, Language } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { getBlurredImageUrl } from '@/lib/server-utils'
import { Blog } from '@prisma/client'
import { notFound } from 'next/navigation'

type BlogWithTranslations = Pick<Blog, 'id' | 'createdAt' | 'imageUrl'> & {
    title: { id: string; en: string }
    content: { id: string; en: string }
}

export type BlogPageContent = BlogWithTranslations & {
    blurImageUrl: string
}

export async function getData(id: string): Promise<BlogPageContent> {
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
                ) AS title,
                -- get content: { id: string; en: string }
                jsonb_build_object(
                    'id', MAX(CASE 
                        WHEN t."key" = ${BlogTranslationKey.CONTENT} AND t."language" = ${Language.ID} 
                        THEN t."value" 
                    END),
                    'en', MAX(CASE 
                        WHEN t."key" = ${BlogTranslationKey.CONTENT} AND t."language" = ${Language.EN} 
                        THEN t."value" 
                    END)
                ) AS content
            FROM blogs AS b
            LEFT JOIN translations AS t 
                ON b."id" = t."entityId"
                AND t."entityType" = ${EntityType.BLOG}
                AND t."key" IN (${BlogTranslationKey.TITLE}, ${BlogTranslationKey.CONTENT})
            WHERE b."id" = ${id}
            GROUP BY b."id", b."createdAt", b."imageUrl"
        `

    if (query.length < 1) {
        notFound()
    }

    // Step 1: Get blurred image for the blog
    const blurredImageUrl = await getBlurredImageUrl(query[0].imageUrl)

    return {
        ...query[0],
        blurImageUrl: blurredImageUrl,
    }
}
