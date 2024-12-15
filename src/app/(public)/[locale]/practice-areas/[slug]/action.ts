'use server'

import { EntityType, Language, PracticeAreaTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { getBlurredImageUrl } from '@/lib/server-utils'
import { PracticeArea } from '@prisma/client'
import { notFound } from 'next/navigation'

type QueryResult = Pick<PracticeArea, 'slug' | 'imageUrl'> & {
    fullName: { id: string; en: string }
    content: { id: string; en: string }
    desc: { id: string; en: string }
}

export type PracticeAreaPageSlugData = QueryResult & {
    blurImageUrl: string | null
}

export async function getData(slug: string): Promise<PracticeAreaPageSlugData> {
    const query: QueryResult[] = await prisma.$queryRaw`
        SELECT 
            pa."slug", pa."imageUrl",
            -- get fullName: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${PracticeAreaTranslationKey.FULL_NAME} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${PracticeAreaTranslationKey.FULL_NAME} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS "fullName",
            -- get content: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${PracticeAreaTranslationKey.CONTENT} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${PracticeAreaTranslationKey.CONTENT} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS "content",
            -- get desc: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${PracticeAreaTranslationKey.DESC} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${PracticeAreaTranslationKey.DESC} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS "desc"
        FROM practice_areas AS pa
        LEFT JOIN translations AS t 
            ON pa."id" = t."entityId" 
            AND t."entityType" = ${EntityType.PRACTICE_AREA}
            AND t."key" IN (
                ${PracticeAreaTranslationKey.FULL_NAME}, 
                ${PracticeAreaTranslationKey.CONTENT},
                ${PracticeAreaTranslationKey.DESC}
            )
        WHERE pa."slug" = ${slug}
        GROUP BY pa."slug", pa."order", pa."imageUrl"
        ORDER BY pa."order"
    `

    if (query.length < 1) {
        notFound()
    }

    // Step 1: Get blurred image for the practice area
    const blurredImageUrl = await getBlurredImageUrl(query[0].imageUrl)

    return {
        ...query[0],
        blurImageUrl: blurredImageUrl,
    }
}
