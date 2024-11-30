'use client'

import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { debounce } from '@/lib/utils'
import { ReactNode, useEffect, useState } from 'react'

type Props = {
    children: ReactNode
}

export default function TeamCarousel({ children }: Props) {
    const [slidesToScroll, setSlidesToScroll] = useState<number>(1)

    useEffect(() => {
        /**
         * handleResize function
         * If there is a resize of the window width, it fires and determines the correct slideToScroll state to match the items that are visible within the carousel
         */
        const handleResize = () => {
            const width = window.innerWidth

            if (width >= 1280) {
                // xl screens
                setSlidesToScroll(5)
            } else if (width >= 1024) {
                // lg screens
                setSlidesToScroll(4)
            } else if (width >= 768) {
                // md screens
                setSlidesToScroll(3)
            } else if (width >= 640) {
                // sm screens
                setSlidesToScroll(2)
            } else {
                setSlidesToScroll(1) // xs screens
            }
        }

        const debounceResize = debounce(handleResize, 1000)

        handleResize() // Initial setup
        window.addEventListener('resize', debounceResize)

        return () => window.removeEventListener('resize', debounceResize)
    }, [])

    return (
        <Carousel
            className="relative w-full lg:w-[95%] xl:w-[87%]"
            opts={{
                align: 'start',
                slidesToScroll,
            }}
        >
            <CarouselContent className="ml-8 mr-12">{children}</CarouselContent>
            <CarouselPrevious className="-left-3 z-20 lg:-left-6" />
            <CarouselNext className="-right-2 z-20 lg:-right-5" />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-14"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-14"></div>
        </Carousel>
    )
}
