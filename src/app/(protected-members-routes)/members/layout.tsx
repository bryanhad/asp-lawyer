import QueryParamToast from '@/components/ui/query-param-toast'
import React, { Suspense } from 'react'
import PageTitle from '../_components/page-title'
import Sidebar from '../_components/nav-components/sidebar'
import Providers from './providers'

type MembersRootLayoutProps = {
    children: React.ReactNode
}

export default async function MembersLayout({ children }: MembersRootLayoutProps) {
    return (
        <Providers>
            <div className="mx-auto mt-16 flex w-full max-w-custom-wide flex-[1]">
                <Suspense>
                    <QueryParamToast param="toast" />
                </Suspense>
                <Sidebar />
                <main className="flex flex-[1] flex-col px-6 py-6 xl:px-12">
                    <PageTitle />
                    {children}
                </main>
            </div>
        </Providers>
    )
}
