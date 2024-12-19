'use client'

import { LoadingIndicator } from '@/components/ui/loading-indicator'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getData } from './action'
import BlogsTable from './blogs-table'
import { BLOGS_QUERY_KEY } from './constants'
import Pagination from './pagination'
import { useState } from 'react'

/**
 * Refer to tanstack's docs:
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components
 */
export function useBlogsData() {
    return useSuspenseQuery({
        queryKey: BLOGS_QUERY_KEY,
        queryFn: () => getData(),
    })
}

export default function DisplayBlogs() {
    const { isPending } = useBlogsData()
    const [isMutating, setIsMutating] = useState(false)

    if (isPending) {
        return <LoadingIndicator />
    }

    return (
        <div className="flex flex-col gap-2 overflow-hidden rounded-md md:min-h-[360px]">
            <BlogsTable isMutating={isMutating} />
            <Pagination setIsMutating={setIsMutating} />
        </div>
    )
}
