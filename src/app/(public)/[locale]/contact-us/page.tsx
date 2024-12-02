import { BaseContainer } from '@/app/(public)/_components/containers/base-container'
import Section from '@/app/(public)/_components/containers/section'
import MapBoxWithAddress from '@/components/ui/mapbox-with-address'
import SectionHeading from '@/components/ui/section-heading'
import { Locale } from '@/i18n/request'
import { Clock, MessageCircle, Phone } from 'lucide-react'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import PageTitleWithBackground from '../../_components/any-page-components/page-title-with-background'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('contactUsPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function ContactUsPage({ params }: Props) {
    const { locale } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const t = await getTranslations('contactUsPage')

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RYEQLudoptbjaLHTsDWNAOSxPrkuCyUhVQ1cZ0"
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <Section
                lessYSpacing
                className="relative mx-auto grid max-w-custom-wide grid-cols-1 gap-10 md:grid-cols-2 md:gap-6 md:px-10"
            >
                <div className="space-y-6">
                    <SectionHeading
                        titleTop={t('subTitle.titleWhite')}
                        titleBottom={t('subTitle.titlePrimary')}
                        side="right"
                        textAlign="left"
                    />
                    <p className="max-w-xl text-muted-foreground max-md:mx-auto max-md:text-center">{t('desc')}</p>

                    <div className="hidden md:block">
                        <Info />
                    </div>
                </div>
                <MapBoxWithAddress className="" />
                <div className="md:hidden">
                    <Info />
                </div>
            </Section>
        </BaseContainer>
    )
}

async function Info() {
    const tContactUs = await getTranslations('contactUs')

    return (
        <>
            <div className="flex flex-col items-center space-x-4 max-md:gap-1 md:flex-row md:items-start">
                <div className="flex items-center gap-2">
                    <Clock className="mt-1 h-6 w-6 shrink-0 text-gray-600 dark:text-primary" />
                    <h4 className="font-semibold text-gray-900 dark:text-stone-300 md:hidden">
                        {tContactUs('businessHours.title')}
                    </h4>
                </div>
                <div className="text-center md:text-start">
                    <h4 className="font-semibold text-gray-900 dark:text-stone-300 max-md:hidden">
                        {tContactUs('businessHours.title')}
                    </h4>
                    <p className="text-muted-foreground">
                        {tContactUs('businessHours.moday-friday')}
                        <br />
                        {tContactUs('businessHours.saturday')}
                        <br />
                        {tContactUs('businessHours.sunday')}
                    </p>
                </div>
            </div>
            <div className="mt-3 flex flex-col gap-3 max-md:items-center">
                <div className="flex items-start space-x-4">
                    <Phone className="mt-1 h-6 w-6 shrink-0 text-gray-600 dark:text-primary" />
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-stone-300">{tContactUs('phone.title')}</h4>
                        <p className="text-muted-foreground">{tContactUs('phone.desc')}</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-gray-600 dark:text-primary" />
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-stone-300">
                            {tContactUs('whatsApp.title')}
                        </h4>
                        <p className="text-muted-foreground">{tContactUs('whatsApp.desc')}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
