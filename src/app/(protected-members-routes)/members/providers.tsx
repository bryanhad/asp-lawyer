'use client'

import { getQueryClient } from '@/lib/tanstack-query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({children}: PropsWithChildren) {
    const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
