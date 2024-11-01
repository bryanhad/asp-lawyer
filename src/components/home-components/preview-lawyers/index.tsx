import kyInstance from '@/lib/ky'
import { LawyerCarouselItemData } from '@/lib/types'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { PreviewLawyersCarousel } from './carousel'

export async function getPreviewLawyersData() {
    return await kyInstance
        .get('/api/lawyers/carousel')
        .json<LawyerCarouselItemData[]>()
}

export default async function PreviewLawyers() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: getPreviewLawyersData,
    })

    return (
        // Neat! Serialization is now as easy as passing props.
        // HydrationBoundary is a Client Component, so hydration will happen there.
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PreviewLawyersCarousel />
        </HydrationBoundary>
    )
}
