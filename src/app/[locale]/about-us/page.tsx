import { BaseContainer } from '@/components/containers/base-container'
import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import VisionAndMissonSection from './_components/vision-and-mission'
import SeniorQuotesSection from './_components/senior-quotes'
import AchievementSection from './_components/achievements'


// fix this multiple getTranslations, it is inside the childrens too.. look it up
export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('aboutPage')

    return {
        title: pageTitle('pageTitle'),
    }
}


export default async function AboutPage() {
    const t = await getTranslations('aboutPage')

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
