import { sourceSerif4 } from '@/app/[locale]/fonts'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import TypeWriterComponent from './typewriter'
import LinkButton from '@/components/ui/link-button'

export default async function Hero() {
    const t = await getTranslations('homePage.heroSection')

    return (
        <div className="w-full overflow-hidden bg-background-suit">
            <div className="relative mx-auto grid h-full w-full max-w-custom-wide grid-cols-1 px-4 py-20 md:grid-cols-3 md:py-24">
                <div className="relative z-30 my-16 max-w-3xl space-y-6 md:col-span-2 lg:mt-24">
                    <div className="space-y-4 lg:space-y-6">
                        <h1
                            className={cn(
                                sourceSerif4.className,
                                'select-none text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl',
                            )}
                        >
                            {t('titleWhite')}
                            <br />
                            <div className="h-20 min-h-20">
                                <TypeWriterComponent
                                    mobile={[
                                        t('titlePrimaryMobile.1'),
                                        t('titlePrimaryMobile.2'),
                                        t('titlePrimaryMobile.3'),
                                    ]}
                                    desktop={[
                                        t('titlePrimaryDesktop.1'),
                                        t('titlePrimaryDesktop.2'),
                                        t('titlePrimaryDesktop.3'),
                                    ]}
                                />
                            </div>
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

                    <p className="max-w-xl text-sm text-slate-400 md:text-base">
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
