import { EntityType, Language, LawyerTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { getBlurredImageUrls } from '@/lib/server-utils'
import { Lawyer } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type LawyerWithTranslations = Pick<
    Lawyer,
    'slug' | 'email' | 'linkedInUrl' | 'name'
> & {
    position: { id: string; en: string }
    degree: { id: string; en: string }
}

export type LawyerCardData = LawyerWithTranslations & {
    imageSrc: string
    blurImageUrl: string
}

export async function GET(
    req: NextRequest,
): Promise<NextResponse<LawyerCardData[]> | NextResponse<{ error: string }>> {
    // const urlOrigin = req.nextUrl.origin

    try {
        const query: LawyerWithTranslations[] = await prisma.$queryRaw`
            SELECT 
                l."slug", l."email", l."linkedInUrl", l."name", 
                -- get position: { id: string; en: string }
                jsonb_build_object(
                    'id', MAX(CASE 
                        WHEN t."key" = ${LawyerTranslationKey.POSITION} AND t."language" = ${Language.ID} 
                        THEN t."value" 
                    END),
                    'en', MAX(CASE 
                        WHEN t."key" = ${LawyerTranslationKey.POSITION} AND t."language" = ${Language.EN} 
                        THEN t."value" 
                    END)
                ) AS position,
                -- get degree: { id: string; en: string }
                jsonb_build_object(
                    'id', MAX(CASE 
                        WHEN t."key" = ${LawyerTranslationKey.DEGREE} AND t."language" = ${Language.ID} 
                        THEN t."value" 
                    END),
                    'en', MAX(CASE 
                        WHEN t."key" = ${LawyerTranslationKey.DEGREE} AND t."language" = ${Language.EN} 
                        THEN t."value" 
                    END)
                ) AS degree
            FROM lawyers AS l
            LEFT JOIN translations AS t 
                ON l."id" = t."entityId" 
                AND t."entityType" = ${EntityType.Lawyer}
                AND t."key" IN (${LawyerTranslationKey.DEGREE}, ${LawyerTranslationKey.POSITION})
            GROUP BY l."slug", l."email", l."linkedInUrl", l."name", l."order"
            ORDER BY l."order"
        `
        // Step 1: Collect image URLs
        const imageUrls = query.map((lawyer) => `lawyers/${lawyer.slug}.png`)

        // Step 2: Get blurred images for all URLs concurrently
        const blurredImageUrls = await getBlurredImageUrls(imageUrls)

        // Step 3: Transform lawyers data, including blurred images
        const transformedLawyers = query.map((lawyer, i) => {
            const result = {
                ...lawyer,
                imageSrc: '/' + imageUrls[i],
                blurImageUrl: blurredImageUrls[i],
            }

            return result
        })

        return NextResponse.json(transformedLawyers)
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
