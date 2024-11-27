import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
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
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RYEQLudoptbjaLHTsDWNAOSxPrkuCyUhVQ1cZ0"
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <Section lessYSpacing>
             
            </Section>
        </BaseContainer>
    )
}
