import { Language, TranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { getBlurredImageUrls } from '@/lib/server-utils'
import {
    LawyerCarouselItemData,
    lawyersDataSelect,
    TranslationDataSelect,
} from '@/lib/types'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
): Promise<
    NextResponse<LawyerCarouselItemData[]> | NextResponse<{ error: string }>
> {
    const urlOrigin = req.nextUrl.origin

    try {
        const lawyers = await prisma.lawyer.findMany({
            select: lawyersDataSelect,
            orderBy: {
                order: 'asc',
            },
        })

        // Step 1: Collect image URLs
        const imageUrls = lawyers.map(
            (lawyer) => `${urlOrigin}/lawyers/${lawyer.slug}.png`,
        )

        // Step 2: Get blurred images for all URLs concurrently
        const blurredImageUrls = await getBlurredImageUrls(imageUrls)

        // Step 3: Transform lawyers data, including blurred images
        const transformedLawyers = lawyers.map((lawyer, i) => {
            const result: LawyerCarouselItemData = {
                ...lawyer,
                imageSrc: imageUrls[i],
                blurImageUrl: blurredImageUrls[i],
                degree: { EN: '', ID: '' },
                position: { EN: '', ID: '' },
            }

            //  Assign 'degree' and 'position' based on translations
            for (const t of lawyer.Translation) {
                if (t.key === TranslationKey.DEGREE) {
                    if (t.language === Language.EN) {
                        result.degree.EN = t.value
                    } else {
                        result.degree.ID = t.value
                    }
                } else if (t.key === TranslationKey.POSITION) {
                    if (t.language === Language.EN) {
                        result.position.EN = t.value
                    } else {
                        result.position.ID = t.value
                    }
                }
            }

            if ('Translation' in result) {
                // Remove Translation array (not needed)
                delete result.Translation
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
