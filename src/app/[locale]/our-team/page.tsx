import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/components/containers/base-container'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('ourTeamPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function MembersPage() {
    const t = await getTranslations('ourTeamPage')

    return (
        <BaseContainer>
            <PageTitleWithBackground
                src={'/home-page/practice-areas.jpg'}
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
        </BaseContainer>
    )
}
