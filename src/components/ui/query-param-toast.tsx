'use client'

import { useToast } from '@/hooks/use-toast'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type Props = { param: string }

export default function QueryParamToast({ param }: Props) {
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    useEffect(() => {
        const queryValue = searchParams.get(param)
        console.log(queryValue)
        if (queryValue) {
            toast({ description: queryValue, variant: 'successful' })

            // Remove the query parameter
            router.replace(pathname) // Update the URL without the query parameter
        }
    }, [searchParams, toast, router, param, pathname])

    return null
}
