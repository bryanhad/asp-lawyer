import { LawyerCardData } from '@/app/api/lawyers/carousel/route'
import LawyerCard from '@/components/home-components/preview-lawyers-section/lawyer-card'
import LawyerCard2 from '@/components/home-components/preview-lawyers-section/lawyer-card-2'
import LawyerCarousel from '@/components/home-components/preview-lawyers-section/client-lawyer-carousel'
import { CarouselItem } from '@/components/ui/carousel'
import { Locale } from '@/i18n/request'
import kyInstance from '@/lib/ky'
import { getLocale } from 'next-intl/server'

export default async function PracticeAreas() {
    const currentLocale = (await getLocale()) as Locale

    const data = await kyInstance
        .get('api/lawyers/carousel')
        .json<LawyerCardData[]>()

    return (
        <>
            <LawyerCarousel>
                {data.map((lawyer) => (
                    <CarouselItem
                        key={lawyer.slug}
                        className="flex pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                        <LawyerCard2
                            key={lawyer.slug}
                            {...lawyer}
                            currentLocale={currentLocale}
                        />
                        {/* <LawyerCard
                            key={lawyer.slug}
                            {...lawyer}
                            currentLocale={currentLocale}
                        /> */}
                    </CarouselItem>
                ))}
            </LawyerCarousel>
        </>
    )
}
