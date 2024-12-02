import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/app/(public)/_components/containers/base-container'
import Section from '@/app/(public)/_components/containers/section'
import { Locale } from '@/i18n/request'
import { MemberRoles } from '@/lib/enum'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import FetchComponent from './_components/member-cards/fetch-component'
import SkeletonFallback from './_components/member-cards/skeleton'

type Props = {
    params: Promise<{ locale: Locale }>
    searchParams: Promise<GenericSearchParams<'role', string | undefined>>
}

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('ourTeamPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function MembersPage({ searchParams, params }: Props) {
    const { locale } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const { role } = await searchParams

    const roleSearchParam =
        role && Object.values(MemberRoles).includes(role as MemberRoles) ? (role as MemberRoles) : undefined

    const t = await getTranslations('ourTeamPage')

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RY0C07LqvRxZw1sVP7NFXpDebCmyBYLAuWirln"
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <Section lessYSpacing className="space-y-6">
                <Suspense fallback={<SkeletonFallback />}>
                    <FetchComponent currentRole={roleSearchParam} />
                </Suspense>
            </Section>
        </BaseContainer>
    )
}
