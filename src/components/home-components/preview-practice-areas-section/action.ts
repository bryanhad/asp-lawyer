'use server'

import { EntityType, Language, PracticeAreaTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { PracticeArea } from '@prisma/client'

export type PracticeAreaPreviewData = Pick<PracticeArea, 'slug'> & {
    fullName: { id: string; en: string }
    shortName: { id: string | null; en: string | null }
    // shortName: { id: string; en: string }
    desc: { id: string; en: string }
}

export async function getPracticeAreasData() {
    try {
        const query: PracticeAreaPreviewData[] = await prisma.$queryRaw`
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
                -- get shortName: { id: string; en: string }
                jsonb_build_object(
                    'id', MAX(CASE 
                        WHEN t."key" = ${PracticeAreaTranslationKey.SHORT_NAME} AND t."language" = ${Language.ID}
                        THEN t."value" 
                    END),
                    'en', MAX(CASE 
                        WHEN t."key" = ${PracticeAreaTranslationKey.SHORT_NAME} AND t."language" = ${Language.EN}
                        THEN t."value" 
                    END)
                ) AS "shortName",
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
                AND t."entityType" = ${EntityType.PracticeArea}
                AND t."key" IN (
                    ${PracticeAreaTranslationKey.FULL_NAME}, 
                    ${PracticeAreaTranslationKey.DESC}, 
                    ${PracticeAreaTranslationKey.SHORT_NAME}
                )
            GROUP BY pa."slug", pa."order"
            ORDER BY pa."order"
        `

        return query
    } catch (err) {
        console.error(err)
        throw new Error('Internal Server Error')
    }
}
