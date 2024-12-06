import QueryParamToast from '@/components/ui/query-param-toast'
import React, { Suspense } from 'react'
import PageTitle from '../_components/page-title'
import Sidebar from '../_components/sidebar'

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
            <main className="flex-[1] py-6 px-6 xl:px-12 flex flex-col">
                <PageTitle />
                {children}
            </main>
        </div>
    )
}
