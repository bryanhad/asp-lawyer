import { MainContainer, SectionContainer } from '@/components/ui/containers'
import { getTranslations } from 'next-intl/server'

export default async function PracticeAreasPage() {
    const t = await getTranslations('practiceAreasPage')

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
