import PreviewAboutUs from '@/components/home-components/preview-about-us'
import PreviewMembers from '@/components/home-components/preview-members'
import PreviewPracticeAreas from '@/components/home-components/preview-practice-areas/preview'
import { MainContainer, SectionBackground } from '@/components/ui/containers'
import HeroCarousel from '../../components/home-components/hero-carousel'

export default async function Home() {
    return (
        <MainContainer>
            <HeroCarousel />
            <SectionBackground src="/low-poly-bg.svg" alt="Low poly background">
                <PreviewAboutUs />
            </SectionBackground>
            <PreviewPracticeAreas />
            <PreviewMembers />
        </MainContainer>
    )
}
