'use client'

import Autoplay from 'embla-carousel-autoplay'

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useRef, useState } from 'react'

type CarouselItemData = {
    backgroundImagePath: string
    content: ReactNode
}

type Props = {
    items: CarouselItemData[]
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
export default function BackgroundCarousel({ items }: Props) {
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
                <CarouselContent className="ml-0">
                    {items.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="relative w-full pl-0"
                        >
                            <div className="relative aspect-square w-full sm:aspect-[5/4] md:aspect-[10/5] lg:aspect-[16/6]">
                                <Image
                                    src={item.backgroundImagePath}
                                    alt={`Carousel image number ${index + 1}`}
                                    fill
                                    quality={100}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {item.content}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="absolute bottom-4 left-1/2 right-0 flex max-w-max -translate-x-1/2 justify-center space-x-3">
                {items.map((_, index) => (
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
