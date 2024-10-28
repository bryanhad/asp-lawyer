import { MainContainer, SectionContainer } from '@/components/ui/containers'
import LinkSection from '@/components/ui/link-section'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('aboutPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function AboutPage() {
    const t = await getTranslations('aboutPage')

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
