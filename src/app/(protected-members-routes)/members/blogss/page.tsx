import LinkButton from '@/app/(protected-members-routes)/_components/link-button'
import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { getData } from './action'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import DisplayBlogs from './display-component'
import { BLOGS_QUERY_KEY } from './constants'

export default async function Blogs2Page() {
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
        queryKey: BLOGS_QUERY_KEY,
        queryFn: () => getData(),
    })

    return (
        <>
            <LinkButton className="mb-4" href={'/members/blogs/add'}>
                Add Blog
            </LinkButton>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <DisplayBlogs />
            </HydrationBoundary>
        </>
    )
}
