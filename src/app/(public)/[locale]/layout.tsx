import Navbar from '@/components/nav-components/navbar'
import { Toaster } from '@/components/ui/toaster'
import { Locale } from '@/i18n/request'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { getLocale, getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../../globals.css'
import Providers from './providers'
import { poppins } from '../../fonts'
import Footer from '@/components/footer-components/footer'
import { cache } from 'react'

export const metadata: Metadata = {
    title: {
        template: '%s | ASP Law Firm',
        default: 'ASP Law Firm',
    },
    description: 'Website ASP',
}

type RootLayoutProps = {
    children: React.ReactNode
    params: Promise<{ locale: Locale }>
}

export const getCurrentLocale = cache(async () => {
    return (await getLocale()) as Locale
})

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
    children,
    params,
}: RootLayoutProps) {
    const { locale: currentLocale } = await params

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(currentLocale)) {
        notFound()
    }

    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    // Enable static rendering
    setRequestLocale(currentLocale)

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages()

    return (
        <html lang={currentLocale} suppressHydrationWarning>
            <body className={`${poppins.className} antialiased`}>
                <Providers
                    intlMessages={messages}
                    initialLocale={currentLocale}
                >
                    <Navbar />
                    <main className="flex min-h-screen flex-col">
                        {children}
                    </main>
                    <Footer />
                </Providers>
                <Toaster />
            </body>
        </html>
    )
}
