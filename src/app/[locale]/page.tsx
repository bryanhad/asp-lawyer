import { BaseContainer } from '@/components/containers/base-container'
import Hero from './_components/hero'
import PreviewAboutUs from './_components/preview-about-us'
import PreviewTeamSection from './_components/preview-members'
import PreviewPracticeAreas from './_components/practice-areas'
import PreviewContactUs from './_components/preview-contact-us'

export default async function Home() {
    return (
        <BaseContainer>
            <Hero />
            <PreviewAboutUs />
            <PreviewTeamSection />
            <PreviewPracticeAreas />
            <PreviewContactUs />
        </BaseContainer>
    )
}
