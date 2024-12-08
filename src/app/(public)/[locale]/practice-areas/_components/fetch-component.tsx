import dynamic from 'next/dynamic'
import { getCurrentLocale } from '@/app/(public)/[locale]/layout'
import SkeletonFallback from './skeleton'
import { getTranslations } from 'next-intl/server'
import { getData } from '../action'

const PinContainer = dynamic(() => import('@/components/ui/animated-pin'), {
    loading: () => <SkeletonFallback />,
})

export default async function FetchComponent() {
    const [t, currentLocale, data] = await Promise.all([getTranslations('commonWords'), getCurrentLocale(), getData()])

    return (
        <div className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {data.map((pa) => (
                <PinContainer
                    key={pa.slug}
                    title={pa.fullName}
                    href={`/practice-areas/${pa.slug}`}
                    src={pa.imageUrl}
                    blurDataUrl={pa.blurImageUrl}
                    currentLocale={currentLocale}
                    pinContainerClassName="rounded-full px-4 py-1 text-sm"
                    pinHeightClassName="h-80"
                    titleClassName='text-lg'
                    className='flex flex-col'
                    hrefText={t('learnMore')}
                />
            ))}
        </div>
    )
}
