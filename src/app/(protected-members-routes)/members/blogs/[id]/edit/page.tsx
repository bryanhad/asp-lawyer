import { getCurrentSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import FetchComponent from './fetch-component'
import { PageLoadingIndicator } from '@/components/ui/loading-indicator'

type Props = {
    params: Promise<{ id: string  }>
}

export default async function EditBlogPage({ params }: Props) {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    return (
        <Suspense fallback={<PageLoadingIndicator />}>
            <FetchComponent params={params} currentUserId={user.id} />
        </Suspense>
    )
}
