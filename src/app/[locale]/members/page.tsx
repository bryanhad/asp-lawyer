import { MainContainer, SectionContainer } from '@/components/ui/containers'
import { getTranslations } from 'next-intl/server'

export default async function MembersPage() {
    const t = await getTranslations('membersPage')

    return (
        <MainContainer>
            <SectionContainer>
                <div className="p-7">
                    <h1 className="text-xl font-bold">{t('title')}</h1>
                    <p>{t('desc')}</p>
                </div>
            </SectionContainer>
        </MainContainer>
    )
}
