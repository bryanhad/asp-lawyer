import { BaseContainer } from '@/components/containers/base-container'
import Hero from './_components/hero'
import PreviewAboutUs from './_components/preview-about-us'
import PreviewLawyersSection from './_components/preview-team'
import PreviewPracticeAreas from './_components/practice-areas'
import PreviewContactUs from './_components/preview-contact-us'

export default async function Home() {
    return (
        <BaseContainer>
            <Hero />
            <PreviewAboutUs />
            <PreviewLawyersSection />
            <PreviewPracticeAreas />
            <PreviewContactUs />
        </BaseContainer>
    )
}
