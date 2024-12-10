'use client'
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top

import { Locale } from '@/i18n/request'
import {
    QueryClientProvider,
} from '@tanstack/react-query'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { PropsWithChildren } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { getQueryClient } from '@/lib/tanstack-query-client'


/**
 * CONFUSED? NOT KNOWING WHAT THE FUCK IS GOING ON?
 *
 * Refer to shadcn carousel documentation:
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#initial-setup
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
