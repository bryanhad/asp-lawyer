import { getTranslations } from 'next-intl/server'
import BioEditor from '../member-components/editor/BioEditor'
import { SectionContainer } from '../ui/containers'
import LinkButton from '../ui/link-button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

export default async function PreviewMembers() {
    const t = await getTranslations('homePage.previewMembers')

    return (
        <SectionContainer title={t('title')} desc={<p>{t('desc')}</p>}>
            <BioEditor />
            <LinkButton variant={'outline-accent'} href={'/members'}>
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}

export function MemberCarousel() {
    return (
        <Carousel className="w-full max-w-sm">
            <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                        key={index}
                        className="pl-1 md:basis-1/2 lg:basis-1/3"
                    >
                        <div className="p-1">
                            {/* <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-2xl font-semibold">
                                        {index + 1}
                                    </span>
                                </CardContent>
                            </Card> */}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
