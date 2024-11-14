import { BaseContainer } from '@/components/containers/base-container'
import { SectionContainer } from '@/components/containers/section-container'
import PageTitleWithBackground from '@/components/page-title-with-background'
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
        <BaseContainer>
            <PageTitleWithBackground
                src={'/home-page/about-us.webp'}
                alt="Background image of about us page"
                titleWhite="About"
                titlePrimary="ASP Law Firm"
            />
            <SectionContainer
                side="left"
                titleTop="Our Dedication"
                titleBottom="And Commitment"
                desc="Arifudin & Susanto Partnership (ASP Law Firm) is known as a law firm committed to providing legal solutions for every issue faced by clients. Our role as legal practitioners is rooted in accountability, with expertise tailored to understand the evolving needs of clients in the Indonesian legal landscape."
                secondaryContent={<p>Hello</p>}
            >
                <div className="p-7">
                    <h1 className="text-xl font-bold">{t('title')}</h1>
                    <p>{t('desc')}</p>
                </div>
            </SectionContainer>
        </BaseContainer>
    )
}
