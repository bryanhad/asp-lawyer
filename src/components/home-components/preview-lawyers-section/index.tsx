import Section from '@/components/containers/section'
import React, { Suspense } from 'react'
import PreviewLawyers from './preview-lawyers'
import SkeletonFallback from './skeleton'
import LinkButton from '@/components/ui/link-button'
import { getTranslations } from 'next-intl/server'
import SectionHeading from '@/components/ui/section-heading'

export default async function PreviewLawyersSection2() {
    const t = await getTranslations('homePage.previewLawyers')

    return (
        <div className="w-full bg-background">
            <Section className="mx-auto flex flex-col items-center gap-6">
                <SectionHeading
                    titleTop={t('titleTop')}
                    titleBottom={t('titleBottom')}
                />
                <p className="text-center text-muted-foreground xl:max-w-[50%]">
                    {t('desc')}
                </p>
                <Suspense fallback={<SkeletonFallback />}>
                    <PreviewLawyers />
                </Suspense>
                <LinkButton className="mx-auto mt-6" href={'/team'}>
                    {t('callToAction')}
                </LinkButton>
            </Section>
        </div>
    )
}
