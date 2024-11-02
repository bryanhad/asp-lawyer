import PreviewAboutUs from '@/components/home-components/preview-about-us'
import PreviewPracticeAreas from '@/components/home-components/preview-practice-areas'
import Hero from '@/components/home-components/hero'
import PreviewLawyersSection from '@/components/home-components/preview-lawyers-section'
import { BaseContainer } from '@/components/containers/base-container'
import { SectionWithBlurBackground } from '@/components/containers/section-with-blur-background'

export default async function Home() {
    return (
        <BaseContainer>
            <Hero />
            <SectionWithBlurBackground
                src="/low-poly-bg.svg"
                alt="Low poly background"
            >
                <PreviewAboutUs />
            </SectionWithBlurBackground>
            <PreviewLawyersSection />
            <PreviewPracticeAreas />
        </BaseContainer>
    )
}
