'use client'

import { LoadingIndicator } from '@/components/ui/loading-indicator'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { getData, getInitialData } from './action'
import BlogsTable from './blogs-table'
import { BLOGS_QUERY_KEY } from './constants'
import Pagination from './pagination'
import { useBlogsTableContext } from './table-context'
import { useEffect } from 'react'

/**
 * Refer to tanstack's docs:
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components
 */
export function useBlogsData(...params: Parameters<typeof getData>) {
    return useQuery({
        queryKey: BLOGS_QUERY_KEY,
        queryFn: () => getData(...params),
        initialData: {
            blogs: [],
            fetchDetail: {
                totalDataCount: 0,
                totalAvailablePages: 0,
                isUsingFilter: false,
                fetchSize: 0,
                fetchedDataCount: 0,
                currentPage: 0,
            },
        },
    })
}

export default function DisplayBlogs() {
    const {isPending} = useBlogsData()
    // const { isPending } = useBlogsData()
    const { setIsLoading } = useBlogsTableContext()

    useEffect(() => {
        setIsLoading(isPending)
    }, [isPending, setIsLoading])

    if (isPending) {
        return <LoadingIndicator />
    }

    return (
        <div className="flex flex-col gap-4 overflow-hidden md:min-h-[360px] md:gap-2">
            <BlogsTable />
            <Pagination />
        </div>
    )
}
