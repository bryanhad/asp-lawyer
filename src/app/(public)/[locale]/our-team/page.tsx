import PageTitleWithBackground from '@/app/(public)/_components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/app/(public)/_components/containers/base-container'
import Section from '@/app/(public)/_components/containers/section'
import { Locale } from '@/i18n/request'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import MemberCards from './_components/member-cards'
import { getData } from './_components/action'

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params
    const t = await getTranslations('ourTeamPage')
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    /**
     * Refer to tanstack's docs:
     * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components
     */
    const queryClient = getQueryClient()
    queryClient.prefetchQuery({
        queryKey: ['team-members'],
        queryFn: getData,
      })

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RY0C07LqvRxZw1sVP7NFXpDebCmyBYLAuWirln"
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <Section lessYSpacing className="space-y-6">
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <MemberCards/>
                </HydrationBoundary>
            </Section>
        </BaseContainer>
    )
}
