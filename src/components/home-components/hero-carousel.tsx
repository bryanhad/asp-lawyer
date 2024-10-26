import BackgroundCarousel from '@/components/background-carousel'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { PropsWithChildren, ReactNode } from 'react'
import { Button } from '../ui/button'

export default async function HeroCarousel() {
    const t = await getTranslations('carousels.homePage')

    const carouselItems = [
        {
            backgroundImagePath: '/home-page/carousel-1.webp',
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

    return <BackgroundCarousel items={carouselItems} />
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
                fontSize: 'clamp(2.5rem, 2vw + 1rem, 3.8rem)',
            }}
            className="font-bold leading-tight"
        >
            {children}
        </h2>
    )
}

function Description({ children }: PropsWithChildren) {
    return (
        <p className="w-full max-w-[80%] leading-snug lg:text-lg xl:text-xl">
            {children}
        </p>
    )
}

function CTA({ href, text }: { href: string; text: string }) {
    return (
        <Button
            asChild
            size="lg"
            className="hover:text-yellow-90 bg-yellow-600 text-white hover:bg-amber-500 lg:text-lg"
        >
            <Link href={href}>{text}</Link>
        </Button>
    )
}
