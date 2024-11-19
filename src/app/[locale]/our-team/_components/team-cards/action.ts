'use server'

import { EntityType, Language, MemberTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { getBlurredImageUrl } from '@/lib/server-utils'
import { Member } from '@prisma/client'
import { notFound } from 'next/navigation'

type QueryResult = Pick<
    Member,
    'slug' | 'name' | 'email' | 'linkedInUrl' | 'role' | 'imageUrl'
> & {
    position: { id: string; en: string }
    degree: { id: string; en: string }
}

export type PracticeAreaPageSlugData = QueryResult & {
    blurImageUrl: string
}

export async function getData(slug: string): Promise<PracticeAreaPageSlugData> {
    const query: QueryResult[] = await prisma.$queryRaw`
        SELECT 
            m."slug", m."name",
            -- get degree: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.DEGREE} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.DEGREE} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS "degree",
            -- get position: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.POSITION} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.POSITION} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS "position",
            -- get bio: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.BIO} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.BIO} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS "bio"
        FROM members AS m
        LEFT JOIN translations AS t 
            ON m."id" = t."entityId" 
            AND t."entityType" = ${EntityType.MEMBER}
            AND t."key" IN (
                ${MemberTranslationKey.DEGREE}, 
                ${MemberTranslationKey.POSITION},
                ${MemberTranslationKey.BIO}
            )
        WHERE m."slug" = ${slug}
        GROUP BY m."slug", m."order", m."imageUrl"
        ORDER BY m."order"
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
