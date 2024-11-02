import { BaseContainer } from '@/components/containers/base-container'
import { SectionContainer } from '@/components/containers/section-container'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('contactUsPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function ContactUsPage() {
    const t = await getTranslations('contactUsPage')

    return (
        <BaseContainer>
            <SectionContainer variant="naked">
                <div className="p-7">
                    <h1 className="text-xl font-bold">{t('title')}</h1>
                    <p>{t('desc')}</p>
                </div>
            </SectionContainer>
        </BaseContainer>
    )
}
