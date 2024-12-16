'use client'

import InfiniteScrollContainer from '@/components/ui/infinite-scroll-container'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { getData } from './action'
import BlogCard from './_components/card'
import { Locale } from '@/i18n/request'
import SkeletonFallback from './skeleton'

type Props = {
    currentLocale: Locale
}

export default function BlogsInfiniteQuery({ currentLocale }: Props) {
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: ['blogs'],
        queryFn: ({ pageParam }) => getData(pageParam ? pageParam : null),
        initialPageParam: null as Date | null,
        getNextPageParam: (lastBlog) => lastBlog.nextCursor,
    })

    /**
     * "data" from useInfiniteQuery is a 2 dimensional array.
     * We can merge it with flatMap
     */
    const blogs = data?.pages.flatMap((page) => page.blogs) || []

    if (status === 'pending') {
        return <SkeletonFallback />
    }

    if (status === 'error') {
        return <p className="text-center text-destructive">An error occured</p>
    }

    return (
        <InfiniteScrollContainer
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        >
            {blogs.map((blog) => (
                <BlogCard currentLocale={currentLocale} key={blog.id} {...blog} />
            ))}
            {isFetchingNextPage && (
                <Loader2 className="text-muted-foreground col-span-1 mx-auto my-3 animate-spin sm:col-span-2 lg:col-span-3" />
            )}
        </InfiniteScrollContainer>
    )
}
