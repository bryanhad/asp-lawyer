import { PracticeAreaPreviewData } from '@/app/api/practice-areas/preview/route'
import { SectionContainer } from '@/components/containers/section-container'
import LinkButton from '@/components/ui/link-button'
import { Locale } from '@/i18n/request'
import kyInstance from '@/lib/ky'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { getLocale, getTranslations } from 'next-intl/server'
import PreviewPracticeAreas from './preview-practice-areas'

export async function getPracticeAreaPreviewData() {
    return await kyInstance
        .get('api/practice-areas/preview')
        .json<PracticeAreaPreviewData[]>()
}

export default async function PreviewLawyersSection() {
    const queryClient = new QueryClient()
    const t = await getTranslations('homePage.previewPracticeAreas')
    const currentLocale = (await getLocale()) as Locale

    await queryClient.prefetchQuery({
        queryKey: ['practice-areas', 'preview'],
        queryFn: getPracticeAreaPreviewData,
    })

    return (
        <div className="flex w-full flex-col items-center bg-white">
            <SectionContainer
                titleTop={t('titleTop')}
                titleBottom={t('titleBottom')}
                desc={<p>{t('desc')}</p>}
                className="flex flex-col items-center"
            >
            {/* 
                // Neat! Serialization is now as easy as passing props.
                // HydrationBoundary is a Client Component, so hydration will happen there.
            */}
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <PreviewPracticeAreas currentLocale={currentLocale} />
                </HydrationBoundary>

                <LinkButton variant={'outline-accent'} href={'/about-us'} className='mt-6'>
                    {t('callToAction')}
                </LinkButton>
            </SectionContainer>
        </div>
    )
}
