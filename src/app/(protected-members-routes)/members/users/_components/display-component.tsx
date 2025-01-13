'use client'

import { PageLoadingIndicator } from '@/components/ui/loading-indicator'
import { useQuery } from '@tanstack/react-query'
import { USERS_QUERY_KEY } from '../../constants'
import { getData } from '../action'
import { useEffect } from 'react'
import { useUsersTableContext } from './table-context'
import UsersTable from './users-table'
import UsersPagination from './users-pagination'

export function useUsersData() {
    return useQuery({
        queryKey: USERS_QUERY_KEY,
        // this is simply bind the argument of getData to be undefined..
        queryFn: getData.bind(null, undefined),
    })
}


export default function DisplayUsers() {
    const { isPending } = useUsersData()
    const { setIsLoading } = useUsersTableContext()

    useEffect(() => {
        setIsLoading(isPending)
    }, [isPending, setIsLoading])

    // if (isPending) {
    //     return <PageLoadingIndicator />
    // }

    return (
        <div className="flex flex-col gap-4 overflow-hidden md:min-h-[360px] md:gap-2">
            <UsersTable />
            <UsersPagination />
        </div>
    )
}
