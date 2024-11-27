import React from 'react'
import { getCurrentLocale } from '@/app/[locale]/layout'
import dynamic from 'next/dynamic'
import SkeletonFallback from './skeleton'
import { getData } from './action'

const PinContainer = dynamic(() => import('@/components/ui/animated-pin'), {
    loading: () => <SkeletonFallback />,
})

export default async function FetchComponent() {
    const achievements = await getData()
    const currentLocale = await getCurrentLocale()

    return (
        <div className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a) => (
                <PinContainer
                    imageHeight={271}
                    imageWidth={300}
                    key={a.id}
                    {...a}
                    currentLocale={currentLocale}
                />
            ))}
        </div>
    )
}
