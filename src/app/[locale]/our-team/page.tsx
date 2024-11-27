import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/components/containers/base-container'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import MemberCards from './_components/member-cards'
import CardFilter from './_components/member-cards/card-filter'
import Section from '@/components/containers/section'
import { Locale } from '@/i18n/request'

type Props = {
    params: Promise<{ currentLocale: Locale }>
    searchParams: Promise<GenericSearchParams<'role', string | undefined>>
}

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('ourTeamPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function MembersPage({ searchParams, params }: Props) {
    const { currentLocale } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
    *
    * Refer to next-intl's documentation:
    * https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
    */
   setRequestLocale(currentLocale)
   
   
   const { role } = await searchParams
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
                <CardFilter searchParams={{ currentRole: role }} />
                <MemberCards
                    currentLocale={currentLocale}
                    searchParams={{ currentRole: role }}
                />
            </Section>
        </BaseContainer>
    )
}
