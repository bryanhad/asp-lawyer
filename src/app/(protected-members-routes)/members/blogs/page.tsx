import { Suspense } from 'react'
import FetchComponent from './fetch-component'
import LinkButton from '@/app/(protected-members-routes)/_components/link-button'
import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'
import { PageLoadingIndicator } from '@/components/ui/loading-indicator'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { getData } from './action'

type Props = {
    searchParams: Promise<GenericSearchParams<'q' | 'page' | 'size', string | undefined>>
}

export default async function BlogsPage({ searchParams }: Props) {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    /**
     * Refer to tanstack's docs:
     * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components
     */
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['members-route', 'blogs'],
        queryFn: () => getData(),
    })

    return (
        <>
            <LinkButton className="mb-4" href={'/members/blogs/add'}>
                Add Blog
            </LinkButton>
            <Suspense fallback={<PageLoadingIndicator />}>
                <FetchComponent searchParams={searchParams} />
            </Suspense>
        </>
    )
}
