import { getCurrentLocale } from '@/app/(public)/[locale]/layout'
import dynamic from 'next/dynamic'
import SkeletonFallback from './skeleton'
import { getData } from './action'

const AnimatedCards = dynamic(() => import('@/components/ui/animated-cards'), {
    loading: () => <SkeletonFallback />,
})

export default async function FetchComponent() {
    const currentLocale = await getCurrentLocale()
    const lawyersWithQuote = await getData()

    return (
        <AnimatedCards
            cardItems={lawyersWithQuote}
            currentLocale={currentLocale}
        />
    )
}
