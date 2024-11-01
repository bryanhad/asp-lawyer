import PreviewAboutUs from '@/components/home-components/preview-about-us'
import PreviewPracticeAreas from '@/components/home-components/preview-practice-areas'
import Hero from '@/components/home-components/hero'
import PreviewLawyers from '@/components/home-components/preview-lawyers'
import {
    BaseContainer,
    SectionWithBlurBackground,
} from '@/components/containers'

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
            <PreviewLawyers />
            <PreviewPracticeAreas />
        </BaseContainer>
    )
}
