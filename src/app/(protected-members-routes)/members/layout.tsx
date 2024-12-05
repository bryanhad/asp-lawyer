import { Locale } from '@/i18n/request'
import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import PageTitle from '../_components/page-title'
import Sidebar from '../_components/sidebar'
import QueryParamToast from '@/components/ui/query-param-toast'

type MembersRootLayoutProps = {
    children: React.ReactNode
}

export default async function MembersLayout({ children }: MembersRootLayoutProps) {
    return (
        <div className="mx-auto mt-16 flex w-full max-w-custom-wide flex-[1]">
            <Suspense>
                <QueryParamToast param="toast" />
            </Suspense>
            <Sidebar />
            <main className="flex-[1] py-6 px-6 xl:px-12">
                <PageTitle />
                {children}
            </main>
        </div>
    )
}
