import { BaseContainer } from '@/components/containers/base-container'
import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AchievementSection from '@/components/about-us-components/achievements-section'
import LawyerQuotes from '@/components/about-us-components/lawyer-quotes'
import VisionAndMissonSection from '@/components/about-us-components/vision-and-mission-section'

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
                titleWhite={t('previewVisionAndMission.titleWhite')}
                titlePrimary={t('previewVisionAndMission.titlePrimary')}
                vision={{
                    title: t('previewVisionAndMission.vision.title'),
                    desc: t('previewVisionAndMission.vision.desc'),
                }}
                mission={{
                    title: t('previewVisionAndMission.mission.title'),
                    desc: [
                        t('previewVisionAndMission.mission.1'),
                        t('previewVisionAndMission.mission.2'),
                        t('previewVisionAndMission.mission.3'),
                    ],
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
