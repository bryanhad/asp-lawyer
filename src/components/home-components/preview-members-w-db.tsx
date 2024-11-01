import prisma from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import { SectionContainer } from '../ui/containers'
import LinkButton from '../ui/link-button'
import { MemberCarousel } from '../member-components/member-carousel'
import { CarouselItem } from '../ui/carousel'
import { MemberCard } from '../member-components/member-card'
import { TranslationKey } from '@/lib/enum'
import { Lawyer } from '@prisma/client'

export default async function PreviewMembers() {
    const lawyers = await prisma.lawyer.findMany({
        select: {
            slug: true,
            email: true,
            linkedInUrl: true,
            name: true,
            Translation: {
                select: {
                    id: true,
                    language: true,
                    key: true,
                    value: true,
                },
                where: {
                    key: {
                        in: [TranslationKey.DEGREE, TranslationKey.POSITION],
                    },
                },
            },
        },
        orderBy: {
            order: 'asc',
        },
    })

    const transformedLawyers = lawyers.map((lawyer) => {
        const result: Omit<Lawyer, 'id' | 'order' | 'Translation'> & {
            degree: null | string
            position: null | string
        } = {
            ...lawyer,
            degree: null,
            position: null,
        }
        //  iterates over lawyer.Translation and assigning 'degree' and 'position'
        for (const t of lawyer.Translation) {
            if (t.key === TranslationKey.DEGREE) {
                result.degree = t.value
            } else if (t.key === TranslationKey.POSITION) {
                result.position = t.value
            }
        }

        // delete result.Translation // Remove Translation array if it’s no longer needed

        return result
    })

    const t = await getTranslations('homePage.previewMembers')

    return (
        <SectionContainer
            titleTop={t('titleTop')}
            titleBottom={t('titleBottom')}
            desc={<p>{t('desc')}</p>}
        >
            {JSON.stringify(lawyers)}
            {/* <BioEditor /> */}
            {/* <MemberCarousel>
                {lawyers.map((lawyer) => (
                    <CarouselItem
                        key={lawyer.slug}
                        className="flex pl-0 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                        <MemberCard key={lawyer.name} {...lawyer} />
                    </CarouselItem>
                ))}
            </MemberCarousel> */}
            <LinkButton variant={'outline-accent'} href={'/members'}>
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}
