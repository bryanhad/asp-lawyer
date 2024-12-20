'use server'

import { EntityType, Language, MemberTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { Member } from '@prisma/client'

type LawyerWithTranslations = Pick<
Member,
    'slug' | 'email' | 'linkedInUrl' | 'name' | 'imageUrl'
> & {
    position: { id: string; en: string }
    degree: { id: string; en: string }
}

export type MemberCardData = LawyerWithTranslations 
// & {
//     blurImageUrl: string
// }

export async function getData() {
    try {
        const query: LawyerWithTranslations[] = await prisma.$queryRaw`
            SELECT 
                l."slug", l."email", l."linkedInUrl", l."name", l."imageUrl",
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
                ) AS position,
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
                ) AS degree
            FROM members AS l
            LEFT JOIN translations AS t 
                ON l."id" = t."entityId" 
                AND t."entityType" = ${EntityType.MEMBER}
                AND t."key" IN (${MemberTranslationKey.DEGREE}, ${MemberTranslationKey.POSITION})
            GROUP BY l."slug", l."email", l."linkedInUrl", l."name", l."order", l."imageUrl"
            ORDER BY l."order"
        `
        // // Step 1: Collect image URLs
        // const imageUrls = query.map((lawyer) => lawyer.imageUrl)

        // // Step 2: Get blurred images for all URLs concurrently
        // const blurredImageUrls = await getBlurredImageUrls(imageUrls)

        // // Step 3: Transform lawyers data, including blurred images
        // const transformedLawyers = query.map((lawyer, i) => {
        //     const result = {
        //         ...lawyer,
        //         imageUrl: imageUrls[i],
        //         blurImageUrl: blurredImageUrls[i],
        //     }

        //     return result
        // })

        return query
    } catch (err) {
        console.error(err)
        throw new Error('Internal Server Error')
    }
}
