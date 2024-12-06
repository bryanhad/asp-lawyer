import { PageLoadingIndicator } from '@/components/ui/loading-indicator'
import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import FetchComponent from './fetch-component'

type Props = {
    params: Promise<{ id: string }>
}

export default async function ViewBlogPage({ params }: Props) {
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
