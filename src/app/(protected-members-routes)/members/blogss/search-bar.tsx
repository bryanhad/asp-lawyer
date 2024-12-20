'use client'

import { Input } from '@/components/ui/input'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { useMutation } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React from 'react'
import { getData } from './action'
import { BLOGS_QUERY_KEY } from './constants'
import { useBlogsTableContext } from './table-context'


export default function SearchBar() {
    const {setIsLoading} = useBlogsTableContext()

    const queryClient = getQueryClient()
    const { mutate: search } = useMutation({
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

    async function handleSubmit(e:  React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const q = formData.get('search') ?? undefined
        if (typeof q === 'string') {
            search({filterValues: {q}})
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex h-10 w-full max-w-[400px] items-center gap-2 rounded-md border border-foreground/40 bg-background px-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
            <label htmlFor="search">
                <Search className="shrink-0 text-foreground/40" size={20} />
            </label>
            <Input
                name='search'
                id="search"
                type="text"
                className="h-max border-0 bg-transparent p-0 focus-visible:ring-transparent"
                placeholder="Search by title or inputor's username"
                size={1}
            />
        </form>
    )
}
