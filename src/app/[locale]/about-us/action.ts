'use server'

import { EntityType, Language, LawyerTranslationKey } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { Lawyer } from '@prisma/client'

export type PracticeAreaPageData = Pick<Lawyer, 'name' | 'imageUrl'> & {
    fullName: { id: string; en: string }
    // shortName: { id: string; en: string }
    content: { id: string; en: string }
}

type LawyerWithTranslations = Pick<Lawyer, 'slug' | 'name'> & {
    position: { id: string; en: string }
    degree: { id: string; en: string }
    quote: { id?: string; en?: string }
}

export type LawyerQuotesData = LawyerWithTranslations & {
    src: string
    // blurImageUrl: string
}

export async function getLawyersWithQuote() {
    try {
        const query: LawyerWithTranslations[] = await prisma.$queryRaw`
            SELECT 
                l."slug", l."name",
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
                ) AS degree,
                -- get quote: { id: string; en: string }
                jsonb_build_object(
                    'id', MAX(CASE 
                        WHEN t."key" = ${LawyerTranslationKey.QUOTE} AND t."language" = ${Language.ID} 
                        THEN t."value" 
                    END),
                    'en', MAX(CASE 
                        WHEN t."key" = ${LawyerTranslationKey.QUOTE} AND t."language" = ${Language.EN} 
                        THEN t."value" 
                    END)
                ) AS quote
            FROM lawyers AS l
            LEFT JOIN translations AS t 
                ON l."id" = t."entityId" 
                AND t."entityType" = ${EntityType.LAWYER}
                AND t."key" IN (
                    ${LawyerTranslationKey.DEGREE}, 
                    ${LawyerTranslationKey.POSITION}, 
                    ${LawyerTranslationKey.QUOTE}
                )
            WHERE l."slug" IN ('arif', 'herlin')
            GROUP BY l."slug", l."name", l."order"
            ORDER BY l."order"
        `

        const lawyersWithImage = query.map((lawyer) => {
            const result = {
                ...lawyer,
                src:
                    lawyer.slug === 'arif'
                        ? `https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/4YTZLQcHF0RYUYpKpGObXmFsjS39BxoYHaeJ0yCUQhf1gO5d` // arif-quote
                        : `https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/4YTZLQcHF0RY2cSmiGCKp8XLOYARutgPevhjcNx356ZdQUw9`, // herlin-quote
            }

            return result
        })
        return lawyersWithImage
    } catch (err) {
        console.error(err)
        throw new Error('Internal Server Error')
    }
}
