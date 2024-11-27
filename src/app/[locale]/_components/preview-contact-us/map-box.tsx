'use client'

import { Button } from '@/components/ui/button'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import { Eye, EyeClosed } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = { className?: string; buildingImageUrl: string }

const MAPBOX_TOKEN =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN_DEV // Local development token
        : process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN_PROD // Production token set in Vercel

export default function MapBox({ className, buildingImageUrl }: Props) {
    const { theme } = useTheme()

    const [coordinate] = useState({
        ltd: -6.219704457801784,
        lng: 106.83200170860196,
    })
    const [showPopup, setShowPopup] = useState(true)

    return (
        <div className={cn('relative w-full', className)}>
            <Button
                className="absolute left-3 top-3 z-10 flex w-[120px] justify-between"
                variant={'outline'}
                onClick={() => setShowPopup((prev) => !prev)}
            >
                <span>{showPopup ? 'Hide Info' : 'Show Info'}</span>
                {showPopup ? (
                    <EyeClosed className="shrink-0" size={20} />
                ) : (
                    <Eye className="shrink-0" size={20} />
                )}
            </Button>
            <Map
                reuseMaps={true}
                initialViewState={{
                    latitude: coordinate.ltd,
                    longitude: coordinate.lng,
                    zoom: 17,
                }}
                style={{ width: '100%' }}
                mapStyle={
                    theme === 'light'
                        ? 'mapbox://styles/mapbox/outdoors-v12'
                        : 'mapbox://styles/mapbox/dark-v11'
                }
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {showPopup && (
                    <Popup
                        maxWidth="280px"
                        latitude={coordinate.ltd}
                        longitude={coordinate.lng}
                        anchor="bottom"
                        offset={[0, -40]}
                        closeOnClick={false}
                        focusAfterOpen={false}
                        closeButton={false}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <Image
                                src={buildingImageUrl}
                                alt="The H Tower"
                                height={200}
                                width={200}
                            />
                            <div className="flex flex-col p-2 dark:text-black">
                                <h2 className="text-lg font-bold">
                                    The H Tower
                                </h2>
                                <p className="leading-tight">
                                    15th Floor <br /> Unit 15 - F
                                </p>
                                <Link
                                    href="https://maps.app.goo.gl/6TRqGwHL7WnXPFSq6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto text-sm text-blue-500"
                                    tabIndex={-1} // Prevents autofocus on render
                                >
                                    Google Maps
                                </Link>
                            </div>
                        </div>
                    </Popup>
                )}
                <Marker
                    latitude={coordinate.ltd}
                    color="red"
                    longitude={coordinate.lng}
                />
                <NavigationControl showZoom={true} />
            </Map>
        </div>
    )
}
