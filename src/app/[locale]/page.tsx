import Hero from '@/components/home-components/hero'
import { BaseContainer } from '@/components/containers/base-container'
import PreviewContactUs from '@/components/home-components/contact-us-section'
import PreviewAboutUs2 from '@/components/home-components/preview-about-us'
import PreviewLawyersSection2 from '@/components/home-components/preview-lawyers-section'
import PreviewPracticeAreas2 from '@/components/home-components/preview-practice-areas-section'

export default async function Home() {
    return (
        <BaseContainer>
            <Hero />
            <PreviewAboutUs2/>
            <PreviewLawyersSection2/>
            <PreviewPracticeAreas2 />
            <PreviewContactUs />
        </BaseContainer>
    )
}
