'use client'

import { Link } from '@/i18n/routing'
import { PracticeAreaPreviewData } from '@/app/api/practice-areas/preview/route'
import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '@/i18n/request'

export default function TagPreview({
    fullName,
    desc,
    slug,
}: PracticeAreaPreviewData) {
    const currentLocale = useLocale() as Locale
    const t = useTranslations('commonWords')
    return (
        <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-6 border">
            <div className="flex items-center gap-4">
                {/* <div className={cn('size-10 rounded-full grid place-items-center text-white', color)} >
                {icon}
                </div> */}
                <h3 className="text-xl font-bold">
                    {currentLocale === 'en' ? fullName.en : fullName.id}
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
    )
}
