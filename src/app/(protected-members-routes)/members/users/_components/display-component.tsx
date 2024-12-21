'use client'

import { PageLoadingIndicator } from '@/components/ui/loading-indicator'
import { useQuery } from '@tanstack/react-query'
import { USERS_QUERY_KEY } from '../../constants'
import { getData } from '../action'

export function useUsersData() {
    return useQuery({
        queryKey: USERS_QUERY_KEY,
        // this is simply bind the argument of getData to be undefined..
        queryFn: getData.bind(null, undefined),
    })
}

export default function DisplayUsers() {
    const { data, isPending } = useUsersData()

    if (isPending) {
        return <PageLoadingIndicator />
    }

    return (
        <div className="flex flex-col gap-4 overflow-hidden md:min-h-[360px] md:gap-2">
            <ul>
                {data &&
                    data.users.map((u) => (
                        <li className="ml-6 list-disc" key={u.id}>
                            {JSON.stringify(u)}
                        </li>
                    ))}
            </ul>
        </div>
    )
}
