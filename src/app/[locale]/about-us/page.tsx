import VisionAndMissonSection from '@/components/about-us-components/vision-and-mission-section'
import { BaseContainer } from '@/components/containers/base-container'
import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AchievementSection from '@/components/about-us-components/achievements-section'
import LawyerQuotes from '@/components/about-us-components/lawyer-quotes'

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
            <VisionAndMissonSection
                vision={{
                    title: t('vision.title'),
                    desc: t('vision.desc'),
                }}
                mission={{
                    title: t('mission.title'),
                    desc: [t('mission.1'), t('mission.2'), t('mission.3')],
                }}
            />
            <LawyerQuotes />
            <AchievementSection
                titleWhite={t('previewAchivements.titleWhite')}
                titlePrimary={t('previewAchivements.titlePrimary')}
            />
        </BaseContainer>
    )
}
