import { Suspense } from 'react'
import FetchComponent from './fetch-component'
import LinkButton from '@/app/(protected-members-routes)/_components/link-button'

type Props = {
    searchParams: Promise<GenericSearchParams<'q' | 'page' | 'size', string | undefined>>
}

export default async function BlogsPage({ searchParams }: Props) {
    const sp = await searchParams
    return (
        <div>
            <LinkButton className='mb-4' href={'/members/blogs/add'}>Add Blog</LinkButton>
            <Suspense fallback={'Loading...'}>
                <FetchComponent searchParams={sp} />
            </Suspense>
        </div>
    )
}
