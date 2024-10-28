import BackgroundCarousel, {
    CarouselItemData,
} from '@/components/background-carousel'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { PropsWithChildren, ReactNode } from 'react'
import { Button } from '../ui/button'
import ImageWithBlur from '../ui/image-with-blur'
import { CarouselItem } from '../ui/carousel'

export default async function HeroCarousel() {
    const t = await getTranslations('carousels.homePage')

    const carouselItems: CarouselItemData[] = [
        {
            backgroundImagePath: '/home-page/carousel-1.webp',
            backgroundImageAlt: '1',
            content: (
                <ContentContainer
                    title={<Title>{t('first.title')}</Title>}
                    desc={<Description>{t('first.desc')}</Description>}
                    cta={
                        <CTA
                            href="/contact-us"
                            text={t('first.callToAction')}
                        />
                    }
                />
            ),
        },
        {
            backgroundImagePath: '/home-page/carousel-2.webp',
            backgroundImageAlt: '2',
            content: (
                <ContentContainer
                    title={<Title>{t('second.title')}</Title>}
                    desc={<Description>{t('second.desc')}</Description>}
                    cta={
                        <CTA
                            href="/contact-us"
                            text={t('second.callToAction')}
                        />
                    }
                />
            ),
        },
        {
            backgroundImagePath: '/home-page/carousel-3.webp',
            backgroundImageAlt: '3',
            content: (
                <ContentContainer
                    title={<Title>{t('third.title')}</Title>}
                    desc={<Description>{t('third.desc')}</Description>}
                    cta={
                        <CTA
                            href="/contact-us"
                            text={t('third.callToAction')}
                        />
                    }
                />
            ),
        },
    ]

    return (
        <BackgroundCarousel itemCount={carouselItems.length}>
            {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="relative w-full pl-0">
                    <div className="relative aspect-square w-full sm:aspect-[5/4] md:aspect-[10/5] lg:aspect-[16/6]">
                        <ImageWithBlur
                            src={item.backgroundImagePath}
                            alt={`Carousel image of ${item.backgroundImageAlt}`}
                            fill
                            quality={100}
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {item.content}
                        </div>
                    </div>
                </CarouselItem>
            ))}
        </BackgroundCarousel>
    )
}

function ContentContainer({
    title,
    desc,
    cta,
}: {
    title: ReactNode
    desc: ReactNode
    cta: ReactNode
}) {
    return (
        <div className="flex w-full max-w-[90%] flex-col items-center text-center text-white">
            <div
                style={{
                    gap: 'clamp(0.5rem, 2vw, 1rem)',
                    marginBottom: 'clamp(1rem, 2vw, 2rem)',
                }}
                className="mb-4 flex flex-col items-center"
            >
                {title}
                {desc}
            </div>
            {cta}
        </div>
    )
}

function Title({ children }: PropsWithChildren) {
    return (
        <h2
            style={{
                fontSize: 'clamp(2rem, 2vw + 1rem, 3.8rem)',
            }}
            className="font-bold leading-tight"
        >
            {children}
        </h2>
    )
}

function Description({ children }: PropsWithChildren) {
    return (
        <p className="w-full max-w-[80%] text-sm leading-snug sm:text-base lg:text-lg xl:text-xl">
            {children}
        </p>
    )
}

function CTA({ href, text }: { href: string; text: string }) {
    return (
        <Button asChild size="lg" variant={'link'}>
            <Link href={href}>{text}</Link>
        </Button>
    )
}
