import { getCurrentLocale } from '@/app/[locale]/layout'
import Section from '@/components/containers/section'
import SectionHeading from '@/components/ui/section-heading'
import FetchComponent from './fetch-component'
import { Suspense } from 'react'
import SkeletonFallback from './skeleton'
import { getPageTranslations } from '../../page'

export default async function AchievementSection() {
    const currentLocale = await getCurrentLocale()
    const t = await getPageTranslations()

    return (
        <Section className='space-y-6'>
            <SectionHeading
                oneLine
                titleTop={t('previewAchivements.titleWhite')}
                titleBottom={t('previewAchivements.titlePrimary')}
                flipText={currentLocale === 'id'}
            />
            <Suspense fallback={<SkeletonFallback />}>
                <FetchComponent />
            </Suspense>
        </Section>
    )
}
