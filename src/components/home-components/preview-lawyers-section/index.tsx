import { SectionContainer } from '@/components/containers/section-container'
import LinkButton from '@/components/ui/link-button'
import { getTranslations } from 'next-intl/server'
import PreviewLawyers from './preview-lawyers'
import { Suspense } from 'react'
import SkeletonFallback from './skeleton'

export default async function PreviewLawyersSection() {
    const t = await getTranslations('homePage.previewLawyers')

    return (
        <SectionContainer
            titleTop={t('titleTop')}
            titleBottom={t('titleBottom')}
            desc={t('desc')}
        >
            <Suspense fallback={<SkeletonFallback />}>
                <PreviewLawyers />
            </Suspense>
            <LinkButton
                className="mx-auto lg:mt-4"
                variant={'outline-accent'}
                href={'/lawyers'}
            >
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}
