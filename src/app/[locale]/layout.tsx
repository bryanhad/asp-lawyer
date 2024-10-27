import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'
import Navbar from '@/components/nav-components/navbar'
import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/request'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

const geistSans = localFont({
    src: '../fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: '../fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: {
        template: '%s | ASP Law firm',
        default: 'ASP Law firm'
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
    const { locale } = await params

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale)) {
        notFound()
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages()
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Navbar selectedLocale={locale} />
                    <main className='mt-16 lg:mt-20'>
                    {children}

                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
