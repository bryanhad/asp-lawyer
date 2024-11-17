import LawyerQuotes from '@/components/about-us-components/lawyer-quotes'
import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
import PageTitleWithBackground from '@/components/page-title-with-background'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

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
            <Section lessTopSpacing>
                <LawyerQuotes />
            </Section>
        </BaseContainer>
    )
}
