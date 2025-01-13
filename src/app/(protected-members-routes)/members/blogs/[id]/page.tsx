import { checkAuthorization } from '@/app/(protected-members-routes)/lib/server/utils'
import { PageLoadingIndicator } from '@/components/ui/loading-indicator'
import { Suspense } from 'react'
import FetchComponent from './fetch-component'

type Props = {
    params: Promise<{ id: string }>
}

export default async function ViewBlogPage({ params }: Props) {
    const res = await checkAuthorization()
    if (res.tooManyRequest) {
        return res.message
    }

    return (
        <Suspense fallback={<PageLoadingIndicator />}>
            <FetchComponent params={params} currentUserId={res.user.id} />
        </Suspense>
    )
}
