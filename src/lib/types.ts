import { Prisma } from '@prisma/client'
import { TranslationKey } from './enum'

export const TranslationDataSelect = {
    id: true,
    language: true,
    key: true,
    value: true,
} satisfies Prisma.TranslationSelect

export const lawyersDataSelect = {
    slug: true,
    email: true,
    linkedInUrl: true,
    name: true,
    Translation: {
        select: TranslationDataSelect,
        where: {
            key: {
                in: [TranslationKey.DEGREE, TranslationKey.POSITION],
            },
        },
    },
} satisfies Prisma.LawyerSelect

export type LawyerCarouselItemData = Prisma.LawyerGetPayload<{
    select: Omit<typeof lawyersDataSelect, 'Translation'>
}> & {
    imageSrc: string
    blurImageUrl: string
    position: { ID: string; EN: string }
    degree: { ID: string; EN: string }
}
