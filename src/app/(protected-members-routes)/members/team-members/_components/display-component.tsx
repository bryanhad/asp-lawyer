'use client'

import { useQuery } from '@tanstack/react-query'
import { MEMBERS_QUERY_KEY} from '../../constants'
import { getData } from '../action'
import { useEffect } from 'react'
import { useMembersTableContext } from './table-context'
import MembersTable from './members-table'
import MembersPagination from './members-pagination'

export function useMembersData() {
    return useQuery({
        queryKey: MEMBERS_QUERY_KEY,
        // this is simply bind the argument of getData to be undefined..
        queryFn: getData.bind(null, undefined),
    })
}


export default function DisplayMembers() {
    const { isPending } = useMembersData()
    const { setIsLoading } = useMembersTableContext()

    useEffect(() => {
        setIsLoading(isPending)
    }, [isPending, setIsLoading])

    return (
        <div className="flex flex-col gap-4 overflow-hidden md:min-h-[360px] md:gap-2">
            <MembersTable />
            <MembersPagination />
        </div>
    )
}
