import { BaseContainer } from '@/app/(public)/_components/containers/base-container'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Locale } from '@/i18n/request'
import PageTitleWithBackground from '../../_components/any-page-components/page-title-with-background'
import { Suspense } from 'react'
import FetchComponent from './fetch-component'
import Section from '../../_components/containers/section'
import SkeletonFallback from './skeleton'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('blogsPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function BlogsPage({ params }: Props) {
    const { locale } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const t = await getTranslations('blogsPage')

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RYF2K4jaflMU0DgEQ2tYL7nTGNux3VXJqhH9pj"
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <Section lessYSpacing className="space-y-6">
                <Suspense fallback={<SkeletonFallback/>}>
                    <FetchComponent />
                </Suspense>
            </Section>
        </BaseContainer>
    )
}
