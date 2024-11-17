import { getLawyersWithQuote } from '@/app/[locale]/about-us/action'
import { getCurrentLocale } from '@/app/[locale]/layout'
import { Suspense } from 'react'
import LawyerQuotesSkeleton from './skeleton'
import LawyerQuotesComponent from './client-component'
import Section from '@/components/containers/section'

export default async function LawyerQuotes() {
    const currentLocale = await getCurrentLocale()
    const lawyersWithQuote = await getLawyersWithQuote()

    return (
        <div className="w-full bg-secondary">
            <Section className='mx-auto'>
                <Suspense fallback={<LawyerQuotesSkeleton />}>
                    <LawyerQuotesComponent
                        cardItems={lawyersWithQuote}
                        currentLocale={currentLocale}
                    />
                </Suspense>
            </Section>
        </div>
    )
}
