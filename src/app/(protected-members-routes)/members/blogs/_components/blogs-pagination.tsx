'use client'

import TablePagination from '@/app/(protected-members-routes)/_components/tables/table-pagination'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { useMutation } from '@tanstack/react-query'
import { BLOGS_QUERY_KEY } from '../../constants'
import { getData } from '../action'
import { useBlogsData } from './display-component'
import { useBlogsTableContext } from './table-context'

function BlogsPagination() {
    const { setIsLoading } = useBlogsTableContext()
    const { data } = useBlogsData()
    const queryClient = getQueryClient()
    const { mutate: paginate } = useMutation({
        mutationFn: getData,
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(BLOGS_QUERY_KEY, newData)
        },
        onSettled: () => {
            setIsLoading(false)
        },
    })

    return <TablePagination fetchDetail={data?.fetchDetail} paginateFn={paginate} />
}

export default BlogsPagination
