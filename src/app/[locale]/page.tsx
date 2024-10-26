import { MainContainer, SectionContainer } from '@/components/ui/containers'
import { getTranslations } from 'next-intl/server'
import HeroCarousel from '../../components/home-components/hero-carousel'

export default async function Home() {
    const t = await getTranslations('homePage')

    return (
        <MainContainer>
            <HeroCarousel />
            <SectionContainer>
                <div className="p-7">
                    <h1 className="text-xl font-bold">{t('title')}</h1>
                    <p>{t('desc')}</p>
                </div>
            </SectionContainer>
        </MainContainer>
    )
}
