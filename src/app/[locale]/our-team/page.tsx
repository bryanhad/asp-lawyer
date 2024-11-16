import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
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
            <Section className="max-w-custom-wide">
                <div className="p-7">
                    <h1 className="text-xl font-bold">{t('title')}</h1>
                    <p>{t('desc')}</p>
                </div>
            </Section>
        </BaseContainer>
    )
}
