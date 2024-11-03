import { EntityType, Language, PracticeAreaTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { PracticeArea } from '@prisma/client'
import { NextResponse } from 'next/server'

export type PracticeAreaPreviewData = Pick<PracticeArea, 'slug'> & {
    fullName: { id: string; en: string }
    // shortName: { id: string; en: string }
    desc: { id: string; en: string }
}

export async function GET(): Promise<
    | NextResponse<PracticeAreaPreviewData[]>
    | NextResponse<{ error: string }>
> {
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
                -- get shortName: { id: string; en: string }
                -- jsonb_build_object(
                --     'id', MAX(CASE 
                --         WHEN t."key" = '' AND t."language" = ''
                --         THEN t."value" 
                --     END),
                --     'en', MAX(CASE 
                --         WHEN t."key" = '' AND t."language" = ''
                --         THEN t."value" 
                --     END)
                -- ) AS "shortName"
            FROM practice_areas AS pa
            LEFT JOIN translations AS t 
                ON pa."id" = t."entityId" 
                AND t."entityType" = ${EntityType.PracticeArea}
                AND t."key" IN (${PracticeAreaTranslationKey.FULL_NAME}, ${PracticeAreaTranslationKey.DESC})
            GROUP BY pa."slug", pa."order"
            ORDER BY pa."order"
        `

        return NextResponse.json(query)
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            {
                error: 'Internal server error',
            },
            { status: 500 },
        )
    }
}
