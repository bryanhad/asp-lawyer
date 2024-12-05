import { BaseContainer } from '@/app/(public)/_components/containers/base-container'
import Section from '@/app/(public)/_components/containers/section'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import PracticeAreaCards from './_components/practice-area-cards'
import { Locale } from '@/i18n/request'
import PageTitleWithBackground from '../../_components/any-page-components/page-title-with-background'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('practiceAreasPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function PracticeAreasPage({ params }: Props) {
    const { locale } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const t = await getTranslations('practiceAreasPage')

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RY7urtob5DOJvheu1RKs3ZwfbE2xA6jHUTBPgr"
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <Section lessYSpacing>
                <PracticeAreaCards />
            </Section>
        </BaseContainer>
    )
}
