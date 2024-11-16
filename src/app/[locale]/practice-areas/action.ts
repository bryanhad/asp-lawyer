'use server'

import { EntityType, Language, PracticeAreaTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { PracticeArea } from '@prisma/client'

export type PracticeAreaPageData = Pick<PracticeArea, 'slug'> & {
    fullName: { id: string; en: string }
    // shortName: { id: string; en: string }
    content: { id: string; en: string }
}

export async function getPracticeAreaPageContent(slug: string) {
    try {
        const query: Array<PracticeAreaPageData> = await prisma.$queryRaw`
            SELECT 
                pa."slug",
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
                ) AS "content"
            FROM practice_areas AS pa
            LEFT JOIN translations AS t 
                ON pa."id" = t."entityId" 
                AND t."entityType" = ${EntityType.PracticeArea}
                AND t."key" IN (${PracticeAreaTranslationKey.FULL_NAME}, ${PracticeAreaTranslationKey.CONTENT})
            WHERE 
                pa."slug" = ${slug}
            GROUP BY pa."slug"
        `

        return query[0]
    } catch (err) {
        console.error(err)
        throw new Error('Internal Server Error')
    }
}
