'use client'

import { useToast } from '@/hooks/use-toast'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { InvalidateQueryFilters } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
    invalidateQueryFilters?: InvalidateQueryFilters
}

export default function SearchParamHandler({ invalidateQueryFilters }: Props) {
    const queryClient = getQueryClient()
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    useEffect(() => {
        const toastValue = searchParams.get('toast')
        const revalidateValue = searchParams.get('revalidate')
        if (toastValue) {
            toast({ description: toastValue, variant: 'successful' })

            // Remove the query parameter
            router.replace(pathname) // Update the URL without the query parameter
        }
        if (revalidateValue === 'true' && invalidateQueryFilters) {
            queryClient.invalidateQueries(invalidateQueryFilters)
        }
    }, [searchParams, toast, router, pathname, invalidateQueryFilters, queryClient])

    return null
}
