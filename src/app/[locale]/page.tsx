import AboutUsPreview from '@/components/home-components/about-us-preview'
import { MainContainer } from '@/components/ui/containers'
import { getTranslations } from 'next-intl/server'
import HeroCarousel from '../../components/home-components/hero-carousel'

export default async function Home() {
    const t = await getTranslations('homePage')

    return (
        <MainContainer>
            <HeroCarousel />
            <AboutUsPreview/>

        </MainContainer>
    )
}
