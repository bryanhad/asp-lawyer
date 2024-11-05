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
        <div className="flex h-60 w-full max-w-[600px] flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center gap-4">
                {/* <div className={cn('size-10 rounded-full grid place-items-center text-white', color)} >
                {icon}
                </div> */}
                <h3 className="text-lg font-semibold text-muted-foreground">
                    {currentLocale === 'en' ? fullName.en : fullName.id}
                </h3>
            </div>
            <p className="line-clamp-3 text-muted-foreground">
                {currentLocale === 'en' ? desc.en : desc.id}
            </p>
            <Link
                className="mt-auto text-blue-500"
                href={`/practice-areas/${slug}`}
            >
                {t('learnMore')}
            </Link>
        </div>
    )
}
