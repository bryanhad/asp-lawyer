'use client'

import { Link } from '@/i18n/routing'
import { PracticeAreaPreviewData } from './action'
import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '@/i18n/request'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function TagPreview({
    fullName,
    shortName,
    desc,
    imageUrl,
    blurImageUrl,
    slug,
}: PracticeAreaPreviewData) {
    const [isLoading, setIsLoading] = useState(true)
    const currentLocale = useLocale() as Locale
    const t = useTranslations('commonWords')

    return (
        <div className="flex gap-2">
            <div className="relative flex w-full gap-4 overflow-hidden rounded-lg border border-input bg-background">
                <div className="absolute inset-0 h-full w-full max-lg:brightness-[25%] lg:relative lg:max-w-[200px] lg:min-w-[200px] dark:lg:dark:brightness-75">
                    {/* Main Image */}
                    <Image
                        src={imageUrl}
                        alt={slug}
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                        placeholder="blur"
                        blurDataURL={blurImageUrl}
                        className={cn(
                            'object-cover transition-all duration-300',
                            isLoading ? 'blur-sm' : 'blur-0',
                        )}
                        onLoad={() => setIsLoading(false)}
                        priority
                    />
                </div>
                <div className="relative z-10 flex flex-col gap-4 p-6">
                    <h3 className="text-xl font-bold max-lg:text-white">
                        {currentLocale === 'en'
                            ? shortName.en || fullName.en
                            : shortName.id || fullName.id}
                    </h3>
                    <p className="line-clamp-2 max-lg:text-white/80">
                        {currentLocale === 'en' ? desc.en : desc.id}
                    </p>
                    <Link
                        className="mt-3 text-primary underline underline-offset-4 duration-200 hover:brightness-110"
                        href={`/practice-areas/${slug}`}
                    >
                        {t('learnMore')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
