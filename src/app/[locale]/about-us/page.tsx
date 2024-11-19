import { BaseContainer } from '@/components/containers/base-container'
import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import VisionAndMissonSection from './_components/vision-and-mission'
import SeniorQuotesSection from './_components/senior-quotes'
import { cache } from 'react'
import AchievementSection from './_components/achievements'

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('aboutPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export const getPageTranslations = cache(async () => {
    return await getTranslations('aboutPage')
})

export default async function AboutPage() {
    const t = await getPageTranslations()

    return (
        <BaseContainer>
            <PageTitleWithBackground
                src={'/home-page/about-us.webp'}
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
