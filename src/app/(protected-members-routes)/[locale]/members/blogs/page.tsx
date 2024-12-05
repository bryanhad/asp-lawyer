import LinkButton from '@/components/ui/link-button'
import { Suspense } from 'react'
import FetchComponent from './fetch-component'

type Props = {
    searchParams: Promise<GenericSearchParams<'q' | 'page' | 'size', string | undefined>>
}

export default async function BlogsPage({ searchParams }: Props) {
    const sp = await searchParams
    return (
        <div>
            <Suspense fallback={'Loading...'}>
                <FetchComponent searchParams={sp} />
            </Suspense>
            <LinkButton href={'/members/blogs/add'}>Add Blog</LinkButton>
        </div>
    )
}
