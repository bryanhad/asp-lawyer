'use client'

import LawyerCard from '@/components/home-components/preview-lawyers-section/lawyer-card'
import LawyerCarousel from '@/components/home-components/preview-lawyers-section/lawyer-carousel'
import { CarouselItem } from '@/components/ui/carousel'
import { Locale } from '@/i18n/request'
import { useQuery } from '@tanstack/react-query'
import PreviewLawyersSkeleton from './skeleton'
import { getPreviewLawyersData } from '.'

type Props = {
    currentLocale: Locale
}

export default function PreviewLawyers({ currentLocale }: Props) {
    // This useQuery could just as well happen in some deeper
    // child, data will be available immediately either way
    const { data, isPending, isError } = useQuery({
        queryKey: ['lawyers', 'preview'],
        queryFn: () => getPreviewLawyersData(),
    })

    // This query was not prefetched on the server and will not start
    // fetching until on the client, both patterns are fine to mix.
    //   const { data: commentsData } = useQuery({
    //     queryKey: ['posts-comments'],
    //     queryFn: getComments,
    //   })

    if (isPending) {
        return <PreviewLawyersSkeleton />
    }

    if (isError) {
        return (
            <p className="text-center text-destructive">
                An error occured while loading lawyers data
            </p>
        )
    }

    return (
        <>
            <LawyerCarousel>
                {data.map((lawyer) => (
                    <CarouselItem
                        key={lawyer.slug}
                        className="flex pl-0 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                        <LawyerCard
                            key={lawyer.slug}
                            {...lawyer}
                            currentLocale={currentLocale}
                        />
                    </CarouselItem>
                ))}
            </LawyerCarousel>
        </>
    )
}
