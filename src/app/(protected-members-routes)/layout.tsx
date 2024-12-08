import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { poppins } from '../fonts'
import '../globals.css'
import Footer from './_components/footer'
import Header from './_components/nav-components/header'

export const metadata: Metadata = {
    title: {
        template: '%s | ASP Law Firm Members',
        default: 'ASP Law Firm Members',
    },
    description: 'Website ASP',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.className} flex min-h-screen flex-col antialiased`}>
                <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Header />
                    {children}
                    <Footer />
                    <Toaster />
                </NextThemesProvider>
            </body>
        </html>
    )
}
