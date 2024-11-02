import { SectionContainer } from '@/components/containers/section-container'
import LinkButton from '@/components/ui/link-button'
import { Locale } from '@/i18n/request'
import kyInstance from '@/lib/ky'
import { LawyerCarouselItemData } from '@/lib/types'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { getLocale, getTranslations } from 'next-intl/server'
import PreviewLawyers from './preview-lawyers'

export async function getPreviewLawyersData() {
    return await kyInstance
        .get('/api/lawyers/carousel')
        .json<LawyerCarouselItemData[]>()
}

export default async function PreviewLawyersSection() {
    const queryClient = new QueryClient()
    const t = await getTranslations('homePage.previewLawyers')
    const currentLocale = (await getLocale()) as Locale

    await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: getPreviewLawyersData,
    })

    return (
        <SectionContainer
            titleTop={t('titleTop')}
            titleBottom={t('titleBottom')}
            desc={t('desc')}
        >
            {/* 
                // Neat! Serialization is now as easy as passing props.
                // HydrationBoundary is a Client Component, so hydration will happen there.
            */}
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PreviewLawyers currentLocale={currentLocale} />
            </HydrationBoundary>
            <LinkButton className='mt-5' variant={'outline-accent'} href={'/members'}>
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}
