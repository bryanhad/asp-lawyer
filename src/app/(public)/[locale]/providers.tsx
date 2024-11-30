'use client'
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top

import { Locale } from '@/i18n/request'
import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { PropsWithChildren } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient()
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

/**
 * CONFUSED? NOT KNOWING WHAT THE FUCK IS GOING ON?
 *
 * Refer to shadcn carousel documentation:
 * https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#initial-setup
 *
 */

export default function Providers({
    children,
    intlMessages,
    initialLocale,
}: PropsWithChildren & {
    intlMessages: AbstractIntlMessages
    initialLocale: Locale
}) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <NextIntlClientProvider
                    messages={intlMessages}
                    locale={initialLocale}
                >
                    {children}
                </NextIntlClientProvider>
            </NextThemesProvider>
        </QueryClientProvider>
    )
}
