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
            <div className="max-h-[500px] max-w-[200px] bg-red-400">
                <Image
                    src={imageUrl}
                    alt={slug}
                    width={400}
                    height={200}
                    placeholder="blur"
                    blurDataURL={blurImageUrl}
                    className="object-cover object-center"
                    priority
                />
            </div>
            <div className="flex w-full flex-col gap-4 rounded-lg border border-input bg-background p-6">
                <div className="flex items-center gap-4">
                    {/* <div className={cn('size-10 rounded-full grid place-items-center text-white', color)} >
                {icon}
                </div> */}
                    <h3 className="text-xl font-bold">
                        {currentLocale === 'en'
                            ? shortName.en || fullName.en
                            : shortName.id || fullName.id}
                    </h3>
                </div>
                <p className="line-clamp-2 text-muted-foreground">
                    {currentLocale === 'en' ? desc.en : desc.id}
                </p>
                <Link
                    className="mt-3 text-blue-600"
                    href={`/practice-areas/${slug}`}
                >
                    {t('learnMore')}
                </Link>
            </div>
        </div>
    )
}
