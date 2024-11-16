import LinkButton from '@/components/ui/link-button'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import PracticeAreas from './practice-areas'
import SkeletonFallback from './skeleton'
import Section from '@/components/containers/section'
import SectionHeading from '@/components/ui/section-heading'

export default async function PreviewPracticeAreas2() {
    const t = await getTranslations('homePage.previewPracticeAreas')

    return (
        <div className="w-full bg-secondary">
            <Section className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* GRID 1 */}
                <div className="flex flex-col gap-4">
                    <SectionHeading
                        titleTop={t('titleTop')}
                        titleBottom={t('titleBottom')}
                        side={'right'}
                        textAlign={'left'}
                    />
                    <p className="text-center text-muted-foreground max-md:hidden md:text-start">
                        {t('desc')}
                    </p>
                    <LinkButton
                        className="mt-6 max-md:mx-auto max-md:hidden"
                        href={'/about-us'}
                    >
                        {t('callToAction')}
                    </LinkButton>
                </div>
                {/* GRID 2 */}
                <div className="flex flex-col">
                    <Suspense fallback={<SkeletonFallback />}>
                        <PracticeAreas />
                    </Suspense>
                    <LinkButton
                        className="mx-auto mt-6 max-md:mx-auto md:hidden"
                        href={'/about-us'}
                    >
                        {t('callToAction')}
                    </LinkButton>
                </div>
            </Section>
        </div>
    )
}
