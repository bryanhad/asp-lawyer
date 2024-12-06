import { Suspense } from 'react'
import FetchComponent from './fetch-component'
import LinkButton from '@/app/(protected-members-routes)/_components/link-button'
import { getCurrentSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PageLoadingIndicator } from '@/components/ui/loading-indicator'

type Props = {
    searchParams: Promise<GenericSearchParams<'q' | 'page' | 'size', string | undefined>>
}

export default async function BlogsPage({ searchParams }: Props) {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    const sp = await searchParams

    return (
        <>
            <LinkButton className="mb-4" href={'/members/blogs/add'}>
                Add Blog
            </LinkButton>
            <Suspense fallback={<PageLoadingIndicator />}>
                <FetchComponent searchParams={sp} />
            </Suspense>
        </>
    )
}
