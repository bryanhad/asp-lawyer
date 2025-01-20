'use client'

import TablePagination from '@/app/(protected-members-routes)/_components/tables/table-pagination'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { useMutation } from '@tanstack/react-query'
import { MEMBERS_QUERY_KEY } from '../../constants'
import { getData } from '../action'
import { useMembersData } from './display-component'
import { useMembersTableContext } from './table-context'

function MembersPagination() {
    const { setIsLoading, isLoading } = useMembersTableContext()
    const { data } = useMembersData()
    const queryClient = getQueryClient()
    const { mutate: paginate } = useMutation({
        mutationFn: getData,
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(MEMBERS_QUERY_KEY, newData)
        },
        onSettled: () => {
            setIsLoading(false)
        },
    })

    return <TablePagination fetchDetail={data?.fetchDetail} paginateFn={paginate} isLoading={isLoading} />
}

export default MembersPagination
