import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PracticeAreaCards from './_components/practice-area-cards'

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('practiceAreasPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function PracticeAreasPage() {
    const t = await getTranslations('practiceAreasPage')

    return (
        <BaseContainer>
            <PageTitleWithBackground
                src={'/home-page/practice-areas.jpg'}
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <Section lessYSpacing>
                <PracticeAreaCards/>
            </Section>
        </BaseContainer>
    )
}
