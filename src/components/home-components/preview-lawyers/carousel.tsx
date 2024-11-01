'use client'

import { useQuery } from '@tanstack/react-query'
import { getPreviewLawyersData } from '.'
import { MemberCarousel } from '@/components/member-components/member-carousel'
import { Loader2 } from 'lucide-react'
import { CarouselItem } from '@/components/ui/carousel'
import { MemberCard } from '@/components/member-components/member-card'
import { Locale } from '@/i18n/request'
import { useLocale } from 'next-intl'
import LinkButton from '@/components/ui/link-button'
import { SectionContainer } from '@/components/containers/section-container'

export function PreviewLawyersCarousel() {
    const currentLocale = useLocale() as Locale

    // This useQuery could just as well happen in some deeper
    // child to <Posts>, data will be available immediately either way
    const { data, isPending, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPreviewLawyersData(),
    })

    // This query was not prefetched on the server and will not start
    // fetching until on the client, both patterns are fine to mix.
    //   const { data: commentsData } = useQuery({
    //     queryKey: ['posts-comments'],
    //     queryFn: getComments,
    //   })

    if (isPending) {
        return <Loader2 className="mx-auto animate-spin" />
    }

    if (isError) {
        return (
            <p className="text-center text-destructive">
                An error occured while loading lawyers data
            </p>
        )
    }

    return (
        <SectionContainer
            titleTop={'preview lawyerss'}
            titleBottom={'mantabb'}
            desc={'wtyeaa'}
        >
            <MemberCarousel>
                {data.map((lawyer) => (
                    <CarouselItem
                        key={lawyer.slug}
                        className="flex pl-0 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                        <MemberCard
                            key={lawyer.name}
                            {...lawyer}
                            currentLocale={currentLocale}
                        />
                    </CarouselItem>
                ))}
            </MemberCarousel>
            <LinkButton variant={'outline-accent'} href={'/members'}>
                {'ayooo sini'}
            </LinkButton>
        </SectionContainer>
    )
}
