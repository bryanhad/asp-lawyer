import { getLawyersWithQuote } from '@/app/[locale]/about-us/action'
import { getCurrentLocale } from '@/app/[locale]/layout'
import { Suspense } from 'react'
import LawyerQuotesSkeleton from './skeleton'
import Section from '@/components/containers/section'
import dynamic from 'next/dynamic'

const AnimatedTestimonials = dynamic(
    () => import('@/components/ui/animated-cards'),
    {
        loading: () => <LawyerQuotesSkeleton />,
    },
)

export default async function LawyerQuotes() {
    const currentLocale = await getCurrentLocale()
    const lawyersWithQuote = await getLawyersWithQuote()

    return (
        <div className="w-full bg-secondary">
            <Section className="mx-auto" lessYSpacing>
                <Suspense fallback={<LawyerQuotesSkeleton />}>
                    <AnimatedTestimonials
                        cardItems={lawyersWithQuote}
                        currentLocale={currentLocale}
                    />
                </Suspense>
            </Section>
        </div>
    )
}
