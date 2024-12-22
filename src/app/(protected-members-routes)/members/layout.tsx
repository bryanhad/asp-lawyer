import SearchParamHandler from '@/components/ui/SearchParamHandler'
import React, { Suspense } from 'react'
import Sidebar from '../_components/nav-components/sidebar'
import PageTitle from '../_components/page-title'
import { BLOGS_QUERY_KEY } from './constants'

type MembersRootLayoutProps = {
    children: React.ReactNode
}

export default async function MembersLayout({ children }: MembersRootLayoutProps) {
    return (
        <div className="mx-auto mt-16 flex w-full max-w-custom-wide flex-[1]">
            <Suspense>
                {/* TODO: sus props.. maybe you can do better than this haha */}
                <SearchParamHandler
                    invalidateQueryFilters={{
                        queryKey: BLOGS_QUERY_KEY,
                    }}
                />
            </Suspense>
            <Sidebar />
            <main className="flex flex-[1] flex-col px-6 py-6 xl:px-12">
                <PageTitle />
                {children}
            </main>
        </div>
    )
}
