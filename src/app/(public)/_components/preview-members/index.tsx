import Section from '@/app/(public)/_components/containers/section'
import React, { Suspense } from 'react'
import SkeletonFallback from './skeleton'
import LinkButton from '@/components/ui/link-button'
import { getTranslations } from 'next-intl/server'
import SectionHeading from '@/components/ui/section-heading'
import FetchComponent from './fetch-component'

export default async function PreviewLawyersSection() {
    const t = await getTranslations('homePage.previewLawyers')

    return (
        <div className="w-full bg-background">
            <Section className="mx-auto flex flex-col items-center gap-6">
                <SectionHeading titleTop={t('titleTop')} titleBottom={t('titleBottom')} />
                <p className="text-center text-muted-foreground xl:max-w-[50%]">{t('desc')}</p>
                <Suspense fallback={<SkeletonFallback />}>
                    <FetchComponent />
                </Suspense>
                <LinkButton className="mx-auto mt-6" href={'/our-team'}>
                    {t('callToAction')}
                </LinkButton>
            </Section>
        </div>
    )
}
