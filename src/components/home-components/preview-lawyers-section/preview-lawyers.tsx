import LawyerCarousel from '@/components/home-components/preview-lawyers-section/client-lawyer-carousel'
import LawyerCard2 from '@/components/home-components/preview-lawyers-section/lawyer-card-2'
import { CarouselItem } from '@/components/ui/carousel'
import { Locale } from '@/i18n/request'
import { getLocale } from 'next-intl/server'
import { getPreviewLawyersData } from './action'

export default async function PreviewLawyers() {
    const currentLocale = (await getLocale()) as Locale

    const data = await getPreviewLawyersData()

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
                    </CarouselItem>
                ))}
            </LawyerCarousel>
        </>
    )
}
