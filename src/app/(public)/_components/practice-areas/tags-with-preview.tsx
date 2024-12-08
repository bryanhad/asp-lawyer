'use client'

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
import {
    BadgeDollarSign,
    Building2,
    FileText,
    Gavel,
    Scale,
    Shield,
} from 'lucide-react'
import { ReactNode, useState } from 'react'
import { PracticeAreaPreviewData } from './action'
import TagPreview from './preview'

type Props = {
    practiceAreas: PracticeAreaPreviewData[]
    currentLocale: Locale
}

export default function PracticeAreaTagsWithPreview({
    practiceAreas,
    currentLocale,
}: Props) {
    const [activeTag, setActiveTag] = useState<string>(practiceAreas[0].slug)
    const activeTagItem = practiceAreas.find(
        (pa) => pa.slug === activeTag,
    ) as PracticeAreaPreviewData

    function handleClick(tagTitle: string) {
        setActiveTag(tagTitle)
    }

    return (
        <div className="flex w-full flex-col gap-6 max-md:items-center">
            <>
                <div className="hidden grid-cols-2 justify-center gap-3 md:grid xl:gap-4">
                    {practiceAreas.map((pa) => (
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
                        {practiceAreas.map((pa, index) => (
                            <CarouselItem
                                key={pa.slug}
                                className={cn('basis-auto pl-3', {
                                    'mr-3': practiceAreas.length - 1 === index,
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
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-secondary to-transparent"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-gradient-to-l from-secondary to-transparent"></div>
                </Carousel>
                {/* The Preview Component showing the Active Practice Areas Details (title, desc, image, etc..) */}
                {/* Reset TagPreview component when activeTag changes */}
                <TagPreview key={activeTagItem.slug} {...activeTagItem} />
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
    let icon: ReactNode
    switch (pa.slug) {
        case 'corporate-banking':
            icon = <Building2 className="shrink-0 text-primary" size={30} />
            break
        case 'money-laundering':
            icon = <Shield className="shrink-0 text-primary" size={30} />
            break
        case 'intellectual-property-rights':
            icon = <FileText className="shrink-0 text-primary" size={30} />
            break
        case 'arbitration':
            icon = <Scale className="shrink-0 text-primary" size={30} />
            break
        case 'bankruptcy-law':
            icon = (
                <BadgeDollarSign className="shrink-0 text-primary" size={30} />
            )
            break
        case 'litigation':
            icon = <Gavel className="shrink-0 text-primary" size={30} />
            break
    }
    return (
        <Button
            variant={'outline'}
            key={pa.key}
            onClick={() => onClick(pa.slug)}
            className={cn(
                'h-11 rounded-md border border-input bg-background',
                {
                    'border border-primary dark:border-stone-500':
                        activeTag === pa.slug,
                },
                className,
            )}
        >
            <div className="flex w-full items-center justify-start gap-2">
                {icon}
                <p className="truncate pt-[1px] leading-none">
                    {currentLocale === 'en'
                        ? !!pa.shortName.en
                            ? pa.shortName.en
                            : pa.fullName.en
                        : pa.shortName.id
                          ? pa.shortName.id
                          : pa.fullName.id}
                </p>
            </div>
        </Button>
    )
}
