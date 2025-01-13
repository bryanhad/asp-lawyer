'use client'

import TablePagination from '@/app/(protected-members-routes)/_components/tables/table-pagination'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { useMutation } from '@tanstack/react-query'
import { USERS_QUERY_KEY } from '../../constants'
import { getData } from '../action'
import { useUsersData } from './display-component'
import { useUsersTableContext } from './table-context'

function UsersPagination() {
    const { setIsLoading } = useUsersTableContext()
    const { data } = useUsersData()
    const queryClient = getQueryClient()
    const { mutate: paginate } = useMutation({
        mutationFn: getData,
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(USERS_QUERY_KEY, newData)
        },
        onSettled: () => {
            setIsLoading(false)
        },
    })

    return <TablePagination fetchDetail={data?.fetchDetail} paginateFn={paginate} />
}

export default UsersPagination
