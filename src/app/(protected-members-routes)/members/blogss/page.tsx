import LinkButton from '@/app/(protected-members-routes)/_components/link-button'
import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { getInitialData } from './action'
import { BLOGS_QUERY_KEY } from './constants'
import DisplayBlogs from './display-component'
import SearchBar from './search-bar'
import { BlogsTableContextProvider } from './table-context'

export default async function Blogs2Page() {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    // /**
    //  * Refer to tanstack's docs:
    //  * @see https://tanstack.com/query/ /docs/framework/react/guides/advanced-ssr#streaming-with-server-components
    //  */
    // const queryClient = getQueryClient()
    // await queryClient.prefetchQuery({
    //     queryKey: BLOGS_QUERY_KEY,
    //     queryFn: getInitialData,
    // })

    return (
        <BlogsTableContextProvider>
            <div className="flex justify-between gap-4">
                <LinkButton className="mb-4" href={'/members/blogs/add'}>
                    Add Blog
                </LinkButton>
                <SearchBar />
            </div>
            {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
                <DisplayBlogs />
            {/* </HydrationBoundary> */}
        </BlogsTableContextProvider>
    )
}
