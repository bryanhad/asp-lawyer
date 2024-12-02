import { BaseContainer } from '@/components/containers/base-container'
import Hero from './_components/hero'
import PreviewAboutUs from './_components/preview-about-us'
import PreviewTeamSection from './_components/preview-members'
import PreviewPracticeAreas from './_components/practice-areas'
import PreviewContactUs from './_components/preview-contact-us'
import { setRequestLocale } from 'next-intl/server'
import { Locale } from '@/i18n/request'

type Props = { params: Promise<{ locale: Locale }> }

export default async function Home({ params }: Props) {
    const { locale } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    return (
        <BaseContainer>
            <Hero />
            <PreviewAboutUs />
            <PreviewTeamSection />
            <PreviewPracticeAreas />
            <PreviewContactUs />
        </BaseContainer>
    )
}
