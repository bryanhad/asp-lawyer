import { getLawyersWithQuote } from '@/app/[locale]/about-us/action'
import { getCurrentLocale } from '@/app/[locale]/layout'
import { Suspense } from 'react'
import ClientComponent from './client-component'
import Skeleton from './skeleton'

export default async function LawyerQuotes() {
    const currentLocale = await getCurrentLocale()
    const lawyersWithQuote = await getLawyersWithQuote()

    return (
        <Suspense fallback={<Skeleton />}>
            <ClientComponent
                cardItems={lawyersWithQuote}
                currentLocale={currentLocale}
            />
        </Suspense>
    )
}
