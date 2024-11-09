import Navbar from '@/components/nav-components/navbar'
import { Toaster } from '@/components/ui/toaster'
import { Locale } from '@/i18n/request'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'
import Providers from './providers'
import { poppins } from './fonts'
import Footer from '@/components/footer-components/footer'

export const metadata: Metadata = {
    title: {
        template: '%s | ASP Law firm',
        default: 'ASP Law firm',
    },
    description: 'Website ASP',
}

type RootLayoutProps = {
    children: React.ReactNode
    params: Promise<{ locale: Locale }>
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

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages()

    return (
        <html lang={currentLocale} suppressHydrationWarning>
            <body
                className={`${poppins.className} antialiased`}
            >
                <Providers
                    intlMessages={messages}
                    initialLocale={currentLocale}
                >
                    <Navbar selectedLocale={currentLocale} />
                    <main className="flex min-h-screen flex-col">
                        {children}
                    </main>
                    <Footer/>
                </Providers>
                <Toaster />
            </body>
        </html>
    )
}
