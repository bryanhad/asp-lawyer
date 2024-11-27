import React from 'react'
import MapBox from './map'
import { MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getPrivateUrl } from '@/lib/server-utils'
import { cn } from '@/lib/utils'

type Props = {
    className?: string
}

export default async function MapBoxWithAddress({ className }: Props) {
    const tContactUs = await getTranslations('contactUs')
    const buildingImageUrl = getPrivateUrl(
        'https://utfs.io/f/4YTZLQcHF0RYOIc7veiVxDy8Li6Atsl1fWqQ7Uz5X0MhuNjP',
    )

    return (
        <div className={cn('space-y-2', className)}>
            <MapBox
                className="h-[500px] overflow-hidden rounded-lg"
                buildingImageUrl={buildingImageUrl}
            />
            <div className="flex items-start space-x-4 rounded-lg border px-4 py-2">
                <MapPin className="mt-1 h-6 w-6 text-gray-600 dark:text-primary" />
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-stone-300">
                        {tContactUs('address.title')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {tContactUs('address.building') +
                            ', ' +
                            tContactUs('address.street')}
                        <br />
                        {tContactUs('address.district') +
                            ', ' +
                            tContactUs('address.city')}
                    </p>
                </div>
            </div>
        </div>
    )
}
