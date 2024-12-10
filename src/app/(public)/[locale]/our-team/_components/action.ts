'use server'

import { EntityType, Language, MemberTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { Member } from '@prisma/client'

type QueryResult = Pick<
    Member,
    'slug' | 'name' | 'email' | 'linkedInUrl' | 'role' | 'imageUrl'
> & {
    position: { id: string; en: string }
    degree: { id: string; en: string }
}

export type MembersData = QueryResult[]
//  & {
//     blurImageUrl: string
// }

export async function getData(): Promise<MembersData> {
    const query: QueryResult[] = await prisma.$queryRaw`
        SELECT 
            m."slug", m."name", m."email", m."linkedInUrl", m."role", m."imageUrl",
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
        GROUP BY m."order", m."slug", m."name", m."email", m."linkedInUrl", m."role", m."imageUrl"
        ORDER BY m."order"
    `

    // // Step 1: Collect image URLs
    // const imageUrls = query.map((pa) => pa.imageUrl)

    // // Step 2: Get blurred images for all URLs concurrently
    // const blurredImageUrls = await getBlurredImageUrls(imageUrls)

    // // Step 3: add blurred images to final data
    // const data = query.map((pa, i) => {
    //     const result = {
    //         ...pa,
    //         blurImageUrl: blurredImageUrls[i],
    //     }

    //     return result
    // })

    return query
}
