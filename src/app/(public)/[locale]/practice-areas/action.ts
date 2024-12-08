'use server'

import { EntityType, Language, PracticeAreaTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { getBlurredImageUrls } from '@/lib/server-utils'
import { PracticeArea } from '@prisma/client'

export type QueryResult = Pick<PracticeArea, 'slug' | 'imageUrl'> & {
    fullName: { id: string; en: string }
    desc: { id: string; en: string }
    blurImageUrl: string
}

export async function getData() {
    try {
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
                    ${PracticeAreaTranslationKey.DESC}, 
                    ${PracticeAreaTranslationKey.SHORT_NAME}
                )
            GROUP BY pa."slug", pa."order", pa."imageUrl"
            ORDER BY pa."order"
        `

        // Step 1: Collect image URLs
        const imageUrls = query.map((pa) => pa.imageUrl)

        // Step 2: Get blurred images for all URLs concurrently
        const blurredImageUrls = await getBlurredImageUrls(imageUrls)

        // Step 3: add blurred images to final data
        const data = query.map((pa, i) => {
            const result = {
                ...pa,
                blurImageUrl: blurredImageUrls[i],
            }

            return result
        })

        return data
    } catch (err) {
        console.error(err)
        throw new Error('Internal Server Error')
    }
}
