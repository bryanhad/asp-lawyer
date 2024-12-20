'use client'

import { PageLoadingIndicator } from '@/components/ui/loading-indicator'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import BlogsTable from './blogs-table'
import Pagination from './pagination'
import { useBlogsTableContext } from './table-context'
import { BLOGS_QUERY_KEY } from '../../constants'
import { getData } from '../action'

/**
 * Refer to tanstack's docs:
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components
 */
export function useBlogsData() {
    return useQuery({
        queryKey: BLOGS_QUERY_KEY,
        // this is simply bind the argument of getData to be undefined..
        queryFn: getData.bind(null, undefined),
    })
}

export default function DisplayBlogs() {
    const { isPending } = useBlogsData()
    const { setIsLoading } = useBlogsTableContext()

    useEffect(() => {
        setIsLoading(isPending)
    }, [isPending, setIsLoading])

    if (isPending) {
        return <PageLoadingIndicator />
    }

    return (
        <div className="flex flex-col gap-4 overflow-hidden md:min-h-[360px] md:gap-2">
            <BlogsTable />
            <Pagination />
        </div>
    )
}
