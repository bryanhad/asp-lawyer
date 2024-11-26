'use server'

import { EntityType, Language, MemberTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import {
    getBlurredImageUrl,
    parse_StringifiedArray_TranslationQuery
} from '@/lib/server-utils'
import { Member } from '@prisma/client'
import { notFound } from 'next/navigation'

type QueryResult = Pick<
    Member,
    'slug' | 'imageUrl' | 'email' | 'linkedInUrl' | 'name' | 'role'
> & {
    position: { id: string; en: string }
    degree: { id: string; en: string }
    bio: { id: string; en: string }
    experience: { id: string; en: string }
    education: { id: string; en: string }
}

export type MemberPageSlugData = Omit<
    QueryResult,
    'experience' | 'education'
> & {
    experience: { id: string[]; en: string[] }
    education: { id: string[]; en: string[] }
    blurImageUrl: string
}

export async function getData(slug: string): Promise<MemberPageSlugData> {
    const query: QueryResult[] = await prisma.$queryRaw`
        SELECT 
            m."slug", m."imageUrl", m."email", m."linkedInUrl", m."name", m."role",
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
            ) AS "bio",
            -- get experience: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.EXPERIENCE} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.EXPERIENCE} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS "experience",
            -- get education: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.EDUCATION} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${MemberTranslationKey.EDUCATION} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS "education"
        FROM members AS m
        LEFT JOIN translations AS t 
            ON m."id" = t."entityId" 
            AND t."entityType" = ${EntityType.MEMBER}
            AND t."key" IN (
                ${MemberTranslationKey.POSITION},
                ${MemberTranslationKey.DEGREE},
                ${MemberTranslationKey.BIO}, 
                ${MemberTranslationKey.EXPERIENCE},
                ${MemberTranslationKey.EDUCATION}
            )
        WHERE m."slug" = ${slug}
        GROUP BY m."slug", m."imageUrl", m."email", m."linkedInUrl", m."name", m."role"
    `

    if (query.length < 1) {
        notFound()
    }

    // Step 1: Get blurred image for the practice area
    const blurredImageUrl = await getBlurredImageUrl(query[0].imageUrl)

    return {
        ...query[0],
        education: parse_StringifiedArray_TranslationQuery(query[0].education),
        experience: parse_StringifiedArray_TranslationQuery(
            query[0].experience,
        ),
        blurImageUrl: blurredImageUrl,
    }
}
