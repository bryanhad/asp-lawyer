'use client'

import Autoplay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselApi,
    CarouselContent
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useRef, useState } from 'react'

type Props = {
    itemCount: number
    children: ReactNode
}
/**
 * A Carousel component for background images with any content
 *
 * Refer to shadcn carousel documentation:
 * https://ui.shadcn.com/docs/components/carousel
 *
 * @param items An array of objects. { "backgroundImagePath": string; "content": ReactNode }[]
 *
 * @returns A cool carousel
 */
export default function BackgroundCarousel({ itemCount, children }: Props) {
    const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null)
    const [current, setCurrent] = useState(0)
    const plugin = useRef(
        Autoplay({
            delay: 5000,
            /**
             * When stopOnMouseEnter is enabled,
             * autoplay will stop when a mouse pointer enters the Embla Carousel container.
             *
             * If stopOnInteraction is also false,
             * autoplay will resume when the mouse leaves the carousel container.
             *
             * Refer to Embla Carousel events documentation:
             * https://www.embla-carousel.com/plugins/autoplay/#stoponmouseenter
             */
            stopOnMouseEnter: true,
            stopOnInteraction: false,
        }),
    )

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.on('select', () => {
            setCurrent(emblaApi.selectedScrollSnap())
        })

        emblaApi.on('reInit', () => {
            setCurrent(emblaApi.selectedScrollSnap())
        })
    }, [emblaApi])

    return (
        <div className="relative w-full">
            <Carousel
                setApi={setEmblaApi}
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent className="ml-0">{children}</CarouselContent>
            </Carousel>
            <div className="absolute bottom-4 left-1/2 right-0 flex max-w-max -translate-x-1/2 justify-center space-x-3">
                {Array.from({ length: itemCount }).map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            'h-2 w-2 rounded-full transition-colors',
                            current === index ? 'bg-gray-300' : 'bg-gray-500',
                        )}
                        onClick={() => emblaApi?.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    )
}
