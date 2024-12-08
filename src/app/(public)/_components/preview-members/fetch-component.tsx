import { getCurrentLocale } from '@/app/(public)/[locale]/layout'
import TeamCarousel from './carousel'
import { CarouselItem } from '@/components/ui/carousel'
import { getData } from './action'
import MemberCard from '@/components/ui/member-card'

export default async function FetchComponent() {
    const currentLocale = await getCurrentLocale()
    const data = await getData()

    return (
        <>
            <TeamCarousel>
                {data.map((lawyer) => (
                    <CarouselItem key={lawyer.slug} className="flex pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <MemberCard key={lawyer.slug} {...lawyer} currentLocale={currentLocale} />
                    </CarouselItem>
                ))}
            </TeamCarousel>
        </>
    )
}
