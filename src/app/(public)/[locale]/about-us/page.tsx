import { BaseContainer } from '@/components/containers/base-container'
import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import VisionAndMissonSection from './_components/vision-and-mission'
import SeniorQuotesSection from './_components/senior-quotes'
import AchievementSection from './_components/achievements'
import { Locale } from '@/i18n/request'

type Props = { params: Promise<{ locale: Locale }> }

// fix this multiple getTranslations, it is inside the childrens too.. look it up
export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('aboutPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const t = await getTranslations('aboutPage')

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RYSAXKpsZHRTDgxUjL5NkmeMoW78A3cuz16J0r"
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <VisionAndMissonSection />
            <SeniorQuotesSection />
            <AchievementSection />
        </BaseContainer>
    )
}
