import Hero from '@/components/home-components/hero'
import { BaseContainer } from '@/components/containers/base-container'
import PreviewLawyersSection from '@/components/home-components/preview-lawyers-section'
import PreviewPracticeAreas from '@/components/home-components/preview-practice-areas-section'
import PreviewContactUs from '@/components/home-components/contact-us-section'
import PreviewAboutUs from '@/components/home-components/preview-about-us'

export default async function Home() {
    return (
        <BaseContainer>
            <Hero />
            <PreviewAboutUs/>
            <PreviewLawyersSection />
            <PreviewPracticeAreas />
            <PreviewContactUs />
        </BaseContainer>
    )
}
