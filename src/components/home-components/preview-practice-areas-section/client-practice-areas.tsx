'use client'

import { PracticeAreaPreviewData } from '@/app/api/practice-areas/preview/route'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Locale } from '@/i18n/request'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import TagPreview from './client-tag-preview'

type Props = {
    data: PracticeAreaPreviewData[]
    currentLocale: Locale
}

export default function ClientPracticeAreas({ data, currentLocale }: Props) {
    const [activeTag, setActiveTag] = useState<string>(data[0].slug)

    function handleClick(tagTitle: string) {
        setActiveTag(tagTitle)
    }

    return (
        <div className="flex w-full flex-col items-center gap-6">
            <>
                <div className="hidden flex-wrap justify-center gap-3 md:flex xl:gap-4">
                    {data.map((pa) => (
                        <PracticeAreaTag
                            {...pa}
                            key={pa.slug}
                            currentLocale={currentLocale}
                            onClick={handleClick}
                            activeTag={activeTag}
                        />
                    ))}
                </div>
                <Carousel className="relative w-full max-w-[88%] md:hidden">
                    <CarouselContent className="-ml-0">
                        {data.map((pa, index) => (
                            <CarouselItem
                                key={pa.slug}
                                className={cn('basis-auto pl-3', {
                                    'mr-3': data.length - 1 === index,
                                })}
                            >
                                <PracticeAreaTag
                                    {...pa}
                                    key={pa.slug}
                                    currentLocale={currentLocale}
                                    onClick={handleClick}
                                    activeTag={activeTag}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-8" />
                    <CarouselNext className="-right-8" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-white to-transparent"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-gradient-to-l from-white to-transparent"></div>
                </Carousel>
                {activeTag && (
                    <TagPreview
                        {...data.filter((data) => data.slug === activeTag)[0]}
                    />
                )}
            </>
        </div>
    )
}

type PracticeAreaTagProps = {
    currentLocale: Locale
    onClick: (slug: string) => void
    activeTag: string | null
    key: string
    className?: string
} & PracticeAreaPreviewData

function PracticeAreaTag({
    currentLocale,
    onClick,
    activeTag,
    className,
    ...pa
}: PracticeAreaTagProps) {
    return (
        <Button
            key={pa.key}
            onClick={() => onClick(pa.slug)}
            className={cn(
                'rounded-full bg-gray-200 text-sm text-gray-500 hover:bg-gray-300',
                {
                    'bg-blue-500 text-white hover:bg-blue-600':
                        activeTag === pa.slug,
                },
                className,
            )}
        >
            <div className="">
                {/* smaller screen size */}
                <p className="">
                    {currentLocale === 'en'
                        ? !!pa.shortName.en
                            ? pa.shortName.en
                            : pa.fullName.en
                        : pa.shortName.id
                          ? pa.shortName.id
                          : pa.fullName.id}
                </p>
                {/* medium screen size */}
                {/* <p className="hidden md:block">
                    {currentLocale === 'en' ? pa.fullName.en : pa.fullName.id}
                </p> */}
            </div>
        </Button>
    )
}
