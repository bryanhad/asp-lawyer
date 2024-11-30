'use server'

import { EntityType, Language, AchievementsTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { getBlurredImageUrls } from '@/lib/server-utils'
import { Achievements } from '@prisma/client'

export type achievementData = {
    id: string
    title: { id: string; en: string }
    desc: { id: string; en: string }
    src: string
    blurDataUrl: string
}

type QueryResult = Pick<Achievements, 'id' | 'imageUrl'> & {
    title: { id: string; en: string }
    desc: { id: string; en: string }
}

export async function getData(): Promise<achievementData[]> {
    try {
        const query: QueryResult[] = await prisma.$queryRaw`
            SELECT 
                a."id", a."imageUrl",
                -- get title: { id: string; en: string }
                jsonb_build_object(
                    'id', MAX(CASE 
                        WHEN t."key" = ${AchievementsTranslationKey.TITLE} AND t."language" = ${Language.ID} 
                        THEN t."value" 
                    END),
                    'en', MAX(CASE 
                        WHEN t."key" = ${AchievementsTranslationKey.TITLE} AND t."language" = ${Language.EN} 
                        THEN t."value" 
                    END)
                ) AS "title",
                -- get desc: { id: string; en: string }
                jsonb_build_object(
                    'id', MAX(CASE 
                        WHEN t."key" = ${AchievementsTranslationKey.DESC} AND t."language" = ${Language.ID} 
                        THEN t."value" 
                    END),
                    'en', MAX(CASE 
                        WHEN t."key" = ${AchievementsTranslationKey.DESC} AND t."language" = ${Language.EN} 
                        THEN t."value" 
                    END)
                ) AS "desc"
            FROM achievements AS a
            LEFT JOIN translations AS t 
                ON a."id" = t."entityId" 
                AND t."entityType" = ${EntityType.ACHIEVEMENT}
                AND t."key" IN (
                    ${AchievementsTranslationKey.TITLE}, 
                    ${AchievementsTranslationKey.DESC}
                )
            GROUP BY  a."id", a."order", a."imageUrl"
            ORDER BY a."order"
        `

        // Step 1: Collect image URLs
        const imageUrls = query.map((a) => a.imageUrl)

        // Step 2: Get blurred images for all URLs concurrently
        const blurredImageUrls = await getBlurredImageUrls(imageUrls)

        // Step 3: add blurred images to final data
        const data: achievementData[] = query.map((a, i) => {
            const result = {
                src: imageUrls[i],
                blurDataUrl: blurredImageUrls[i],
                id: a.id,
                title: a.title,
                desc: a.desc,
            }
            return result
        })

        return data
    } catch (err) {
        console.error(err)
        throw new Error('Internal Server Error')
    }
}
