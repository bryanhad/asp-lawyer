import { sourceSerif4 } from '@/app/[locale]/fonts'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import LinkButton from '../ui/link-button'
import { FlipWords } from '../ui/flip-words'

export default async function Hero() {
    const t = await getTranslations('homePage')
    const words = [
        t('titlePrimary.1'),
        t('titlePrimary.2'),
        t('titlePrimary.3'),
    ]

    return (
        <div className="w-full overflow-hidden bg-background-suit">
            <div className="relative mx-auto grid h-full w-full max-w-custom-wide grid-cols-1 px-4 py-20 md:grid-cols-2 md:py-24">
                <div className="relative z-30 my-16 max-w-3xl space-y-6 lg:mt-24">
                    <div className="space-y-4 lg:space-y-6">
                        <h1
                            className={cn(
                                sourceSerif4.className,
                                'select-none text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl',
                            )}
                        >
                            {t('titleWhite')}
                            <br />
                            <FlipWords
                                words={words}
                                className="text-primary dark:text-primary"
                            />
                        </h1>
                        <h2
                            className={cn(
                                sourceSerif4.className,
                                'select-none text-xl font-medium text-white sm:text-3xl lg:text-2xl',
                            )}
                        >
                            {t('titleExtra')}
                        </h2>
                    </div>

                    <p className="max-w-xl text-base text-slate-400">
                        {t('desc')}
                    </p>

                    <LinkButton href={'/contact-us'} variant={'primary'}>
                        {t('callToAction')}
                    </LinkButton>
                </div>
                <div className="absolute -right-10 top-0 h-full w-[80%] overflow-hidden md:w-2/3">
                    {/* image overlay */}
                    <div className="absolute inset-0 z-10 bg-background-suit opacity-50"></div>

                    {/* image left and right blur */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-44 bg-gradient-to-r from-background-suit to-transparent"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-52 bg-gradient-to-l from-background-suit to-transparent"></div>

                    <Image
                        src={'/home-page/hero-lawyers.png'}
                        alt="Lawyers"
                        className="object-cover object-center"
                        fill
                        quality={80}
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
