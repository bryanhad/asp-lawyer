import { Locale } from '@/i18n/request'
import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import PageTitle from '../../_components/page-title'
import Sidebar from '../../_components/sidebar'
import QueryParamToast from '@/components/ui/query-param-toast'

type MembersRootLayoutProps = {
    children: React.ReactNode
    params: Promise<{ locale: Locale }>
}

export default async function MembersLayout({ children, params }: MembersRootLayoutProps) {
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
        <div className="mx-auto mt-16 flex w-full max-w-custom-wide flex-[1] gap-12">
            <Suspense>
                <QueryParamToast param="toast" />
            </Suspense>
            <Sidebar />
            <main className="flex-[1] py-6">
                <PageTitle />
                {children}
            </main>
        </div>
    )
}
