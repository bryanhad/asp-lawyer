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
import PreviewLawyers from './preview-lawyers'
import { LawyerCardData } from '@/app/api/lawyers/carousel/route'

export async function getPreviewLawyersData() {
    return await kyInstance
        .get('api/lawyers/carousel')
        .json<LawyerCardData[]>()
}

export default async function PreviewLawyersSection() {
    const queryClient = new QueryClient()
    const t = await getTranslations('homePage.previewLawyers')
    const currentLocale = (await getLocale()) as Locale

    await queryClient.prefetchQuery({
        queryKey: ['lawyers', 'preview'],
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
