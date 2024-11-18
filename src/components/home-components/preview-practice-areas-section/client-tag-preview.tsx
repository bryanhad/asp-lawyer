'use client'

import { Link } from '@/i18n/routing'
import { PracticeAreaPreviewData } from './action'
import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '@/i18n/request'
import Image from 'next/image'

export default function TagPreview({
    fullName,
    shortName,
    desc,
    imageUrl,
    blurImageUrl,
    slug,
}: PracticeAreaPreviewData) {
    const currentLocale = useLocale() as Locale
    const t = useTranslations('commonWords')
    return (
        <div className="flex gap-2">
            <div className="flex w-full gap-4 overflow-hidden rounded-lg border border-input bg-background">
                <div className="relative min-w-[200px]">
                    <Image
                        src={imageUrl}
                        alt={slug}
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        placeholder="blur"
                        blurDataURL={blurImageUrl}
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-4 p-6">
                    <h3 className="text-xl font-bold">
                        {currentLocale === 'en'
                            ? shortName.en || fullName.en
                            : shortName.id || fullName.id}
                    </h3>
                    <p className="line-clamp-2 text-muted-foreground">
                        {currentLocale === 'en' ? desc.en : desc.id}
                    </p>
                    <Link
                        className="mt-3 text-blue-600 hover:text-blue-500 dark:text-primary dark:hover:brightness-110 duration-200"
                        href={`/practice-areas/${slug}`}
                    >
                        {t('learnMore')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
