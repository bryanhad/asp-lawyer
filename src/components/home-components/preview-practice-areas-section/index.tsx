import { SectionContainer } from '@/components/containers/section-container'
import LinkButton from '@/components/ui/link-button'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import PracticeAreas from './practice-areas'
import SkeletonFallback from './skeleton'

export default async function PreviewLawyersSection() {
    const t = await getTranslations('homePage.previewPracticeAreas')

    return (
        <div className="flex w-full flex-col items-center bg-secondary">
            <SectionContainer
                side="left"
                titleTop={t('titleTop')}
                titleBottom={t('titleBottom')}
                desc={<p>{t('desc')}</p>}
                descClassName='max-md:hidden'
                secondaryContent={
                    <div className='mt-2'>
                        <Suspense fallback={<SkeletonFallback />}>
                            <PracticeAreas />
                        </Suspense>
                    </div>
                }
            >
                <LinkButton
                    href={'/about-us'}
                    className="mt-6"
                >
                    {t('callToAction')}
                </LinkButton>
            </SectionContainer>
        </div>
    )
}
