import React from 'react'
import { getCurrentLocale } from '@/app/(public)/[locale]/layout'
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
                    className="min-h-[330px]"
                    imageContainerClassName="h-[250px]"
                    key={a.id}
                    {...a}
                    currentLocale={currentLocale}
                />
            ))}
        </div>
    )
}
