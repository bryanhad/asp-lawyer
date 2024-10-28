import PreviewAboutUs from '@/components/home-components/preview-about-us'
import PreviewMembers from '@/components/home-components/preview-members'
import PreviewPracticeAreas from '@/components/home-components/preview-practice-areas/preview'
import { MainContainer } from '@/components/ui/containers'
import HeroCarousel from '../../components/home-components/hero-carousel'

export default async function Home() {
    return (
        <MainContainer>
            <HeroCarousel />
            <PreviewAboutUs />
            <PreviewPracticeAreas />
            <PreviewMembers />
        </MainContainer>
    )
}
