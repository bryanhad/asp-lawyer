import { MainContainer, SectionContainer } from '@/components/ui/containers'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('membersPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function MembersPage() {
    const t = await getTranslations('membersPage')

    return (
        <MainContainer>
            <SectionContainer variant="naked">
                <div className="p-7">
                    <h1 className="text-xl font-bold">{t('title')}</h1>
                    <p>{t('desc')}</p>
                </div>
            </SectionContainer>
        </MainContainer>
    )
}
