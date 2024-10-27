import { MainContainer, SectionContainer } from '@/components/ui/containers'
import { getTranslations } from 'next-intl/server'

export default async function ContactUsPage() {
    const t = await getTranslations('contactUsPage')

    return (
        <MainContainer>
            <SectionContainer
            >
                <div className="p-7">
                    <h1 className="text-xl font-bold">{t('title')}</h1>
                    <p>{t('desc')}</p>
                </div>
            </SectionContainer>
        </MainContainer>
    )
}
