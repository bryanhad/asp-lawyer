import PreviewAboutUs from '@/components/home-components/preview-about-us'
import { MainContainer } from '@/components/ui/containers'
import { getTranslations } from 'next-intl/server'
import HeroCarousel from '../../components/home-components/hero-carousel'
import PreviewPracticeAreas from '@/components/home-components/preview-practice-areas'
import PreviewMembers from '@/components/home-components/preview-members'

export default async function Home() {
    const t = await getTranslations('homePage')

    return (
        <MainContainer>
            <HeroCarousel />
            <PreviewAboutUs />
            <PreviewPracticeAreas />
            <PreviewMembers />
        </MainContainer>
    )
}
