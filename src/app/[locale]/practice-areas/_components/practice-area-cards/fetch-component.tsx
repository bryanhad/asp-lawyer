import dynamic from 'next/dynamic'
import { getCurrentLocale } from '@/app/[locale]/layout'
import { getData } from '../../action'

const PinContainer = dynamic(() => import('@/components/ui/animated-pin'), {
    loading: () => <p>Loading..</p>,
})

export default async function FetchDataComponent() {
    const data = await getData()
    const currentLocale = await getCurrentLocale()

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
                />
            ))}
        </div>
    )
}
