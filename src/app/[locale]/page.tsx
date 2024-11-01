import PreviewAboutUs from '@/components/home-components/preview-about-us'
import PreviewPracticeAreas from '@/components/home-components/preview-practice-areas/preview'
import { MainContainer, SectionBackground } from '@/components/ui/containers'
import Hero from '@/components/home-components/hero'
import PreviewMembers from '@/components/home-components/preview-members-w-db'

export default async function Home() {
    return (
        <MainContainer>
            <Hero/>
            <SectionBackground src="/low-poly-bg.svg" alt="Low poly background">
                <PreviewAboutUs />
            </SectionBackground>
            <PreviewMembers/>
            <PreviewPracticeAreas />
        </MainContainer>
    )
}
