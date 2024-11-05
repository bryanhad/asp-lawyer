import { SectionContainer } from '@/components/containers/section-container'
import LinkButton from '@/components/ui/link-button'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import PracticeAreas from './practice-areas'
import SkeletonFallback from './skeleton'

export default async function PreviewLawyersSection() {
    const t = await getTranslations('homePage.previewPracticeAreas')

    return (
        <div className="flex w-full flex-col items-center bg-white">
            <SectionContainer
                titleTop={t('titleTop')}
                titleBottom={t('titleBottom')}
                desc={<p>{t('desc')}</p>}
                className="flex flex-col items-center"
            >
                <Suspense fallback={<SkeletonFallback />}>
                    <PracticeAreas />
                </Suspense>
                <LinkButton
                    variant={'outline-accent'}
                    href={'/about-us'}
                    className="mt-6"
                >
                    {t('callToAction')}
                </LinkButton>
            </SectionContainer>
        </div>
    )
}
