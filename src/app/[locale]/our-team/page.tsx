import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/components/containers/base-container'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getCurrentLocale } from '../layout'
import MemberCards from './_components/member-cards'
import CardFilter from './_components/member-cards/card-filter'
import Section from '@/components/containers/section'

type Props = {
    searchParams: Promise<GenericSearchParams<'role', string | undefined>>
}

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('ourTeamPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function MembersPage({ searchParams }: Props) {
    const { role } = await searchParams
    const currentLocale = await getCurrentLocale()

    const t = await getTranslations('ourTeamPage')

    return (
        <BaseContainer>
            <PageTitleWithBackground
                src={'/home-page/practice-areas.jpg'}
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <Section lessYSpacing className='space-y-6'>
                <CardFilter searchParams={{ currentRole: role }} />
                <MemberCards
                    currentLocale={currentLocale}
                    searchParams={{ currentRole: role }}
                />
            </Section>
        </BaseContainer>
    )
}
