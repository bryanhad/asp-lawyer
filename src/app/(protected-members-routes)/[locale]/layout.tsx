import { Toaster } from '@/components/ui/toaster'
import { Locale } from '@/i18n/request'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { getLocale, setRequestLocale } from 'next-intl/server'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { poppins } from '../../fonts'
import '../../globals.css'
import Header from './_components/header'
import Footer from './_components/footer'

export const metadata: Metadata = {
    title: {
        template: '%s | ASP Law Firm Members',
        default: 'ASP Law Firm Members',
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

    return (
        <html lang={currentLocale} suppressHydrationWarning>
            <body
                className={`${poppins.className} flex min-h-screen flex-col antialiased`}
            >
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                    <Footer />
                    <Toaster />
                </NextThemesProvider>
            </body>
        </html>
    )
}
