import SeniorQuotes from '@/components/about-us-components/senior-quotes'
import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
import PageTitleWithBackground from '@/components/page-title-with-background'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('aboutPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function AboutPage() {
    const t = await getTranslations('aboutPage')

    const testimonials = [
        {
            quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
            name: 'Sarah Chen',
            designation: 'Product Manager at TechFlow',
            src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
            name: 'Michael Rodriguez',
            designation: 'CTO at InnovateSphere',
            src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
            name: 'Emily Watson',
            designation: 'Operations Director at CloudScale',
            src: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
            name: 'James Kim',
            designation: 'Engineering Lead at DataPro',
            src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            quote: 'The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.',
            name: 'Lisa Thompson',
            designation: 'VP of Technology at FutureNet',
            src: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ]

    return (
        <BaseContainer>
            <PageTitleWithBackground
                src={'/home-page/about-us.webp'}
                alt="Background image of about us page"
                titleWhite="About"
                titlePrimary="ASP Law Firm"
            />
            <Section lessTopSpacing>
                <SeniorQuotes testimonials={testimonials} />
            </Section>
        </BaseContainer>
    )
}
