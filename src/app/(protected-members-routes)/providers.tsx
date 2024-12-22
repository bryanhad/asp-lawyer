'use client'

import { getQueryClient } from '@/lib/tanstack-query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function Providers({ children }: PropsWithChildren) {
    const queryClient = getQueryClient()
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </NextThemesProvider>
    )
}
