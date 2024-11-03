import Image from 'next/image'
import { SectionContainer } from '../containers/section-container'
import LinkButton from '../ui/link-button'
import { getTranslations } from 'next-intl/server'

export default async function Hero() {
    const t = await getTranslations('homePage')

    return (
        <SectionContainer
            backgroundClassName="bg-slate-800 overflow-hidden"
            variant="naked"
            className="relative grid h-full  max-w-[1620px] grid-cols-1 px-4 md:grid-cols-2 md:py-24"
        >
            <div className="relative z-30 my-16 max-w-3xl space-y-8 lg:mt-24">
                <div className="space-y-4 lg:space-y-6">
                    <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        {t('titleWhite')}
                        <br />
                        <span className="text-primary">
                            {t('titlePrimary1')}
                        </span>
                        <br className="md:hidden" />
                        <span className="text-primary md:ml-5">
                            {t('titlePrimary2')}
                        </span>
                    </h1>
                    <h2 className="text-xl font-medium text-white sm:text-3xl lg:text-2xl">
                        {t('titleExtra')}
                    </h2>
                </div>

                <p className="max-w-xl text-base text-slate-300">{t('desc')}</p>

                <LinkButton href={'/contact-us'} variant={'primary'}>
                    {t('callToAction')}
                </LinkButton>
            </div>
            <div className="absolute -right-10 top-0 h-full w-[80%] md:w-2/3 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-slate-800 opacity-50"></div>

                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-44 bg-gradient-to-r from-slate-800 to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-52 bg-gradient-to-l from-slate-800 to-transparent"></div>

                <Image
                    src={'/home-page/hero-lawyers.png'}
                    alt="Lawyers"
                    className="object-cover object-center"
                    fill
                    quality={80}
                    priority
                />
            </div>
        </SectionContainer>
    )
}
