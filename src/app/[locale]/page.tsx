import PreviewAboutUs from '@/components/home-components/preview-about-us'
import Hero from '@/components/home-components/hero'
import { BaseContainer } from '@/components/containers/base-container'
import { SectionWithBlurBackground } from '@/components/containers/section-with-blur-background'
import PreviewLawyersSection from '@/components/home-components/preview-lawyers-section'
import PreviewPracticeAreas from '@/components/home-components/preview-practice-areas-section'
import PreviewContactUs from '@/components/home-components/contact-us-section'

export default async function Home() {
    return (
        <BaseContainer>
            <Hero />
            <SectionWithBlurBackground
                src="/low-poly-bg.svg"
                alt="Low poly background"
                priority
            >
                <PreviewAboutUs />
            </SectionWithBlurBackground>
            <PreviewLawyersSection />
            <PreviewPracticeAreas />
            <PreviewContactUs />
        </BaseContainer>
    )
}
