import { Locale } from '@/i18n/request'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import PageTitleWithBackground from '../../_components/any-page-components/page-title-with-background'
import { BaseContainer } from '../../_components/containers/base-container'
import Section from '../../_components/containers/section'
import { Metadata } from 'next'
import BlogsInfiniteQuery from './blogs-infinite-query'

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
                <BlogsInfiniteQuery currentLocale={locale} />
            </Section>
        </BaseContainer>
    )
}
