'use client'

import Flag from '@/components/ui/flag'
import ImageWithFallbackPlaceholder from '@/components/ui/image-with-fallback-placeholder'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { DeleteButton, EditButton, ViewButton } from '../../../_components/buttons'
import BlogCard from './card'
import { useBlogsData } from './display-component'
import InputorInfo from './inputor-info'
import { SkeletonFallbackDesktop, SkeletonFallbackMobile } from './skeleton'
import { useBlogsTableContext } from './table-context'
import TableDataNotFound from './table-data-not-found'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { deleteBlogAction } from '../action'
import { BLOGS_QUERY_KEY } from '../../constants'
import { getQueryClient } from '@/lib/tanstack-query-client'

export default function BlogsTable() {
    const { isLoading } = useBlogsTableContext()
    const { data } = useBlogsData()

    const queryClient = getQueryClient()
    const { toast } = useToast()
    // DELETE BLOG MUTATION
    const {
        mutate: deleteBlog,
        isPending: isDeleteBlogPending,
        isSuccess: isDeleteBlogSuccessful,
    } = useMutation({
        mutationFn: deleteBlogAction,
        onSuccess: ({ success, message }) => {
            if (success) {
                // revalidate client cache
                queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY })
            }
            toast({ variant: success ? 'successful' : 'destructive', description: message })
        },
        onError: () => {
            toast({ variant: 'destructive', description: 'Internal server error' })
        },
    })

    if (!data) return null

    return (
        <div className="flex-[1] bg-background md:rounded-md md:border">
            {/* MOBILE */}
            <div className="flex flex-col gap-4 md:hidden">
                {isLoading && <SkeletonFallbackMobile />}
                {!isLoading && data.blogs.length < 1 && <TableDataNotFound notForTable tableName="blog" />}
                {!isLoading &&
                    data.blogs.length > 0 &&
                    data.blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            {...blog}
                            deleteButton={
                                <DeleteButton
                                    small
                                    className="flex-[1]"
                                    toBeDeletedName={blog.title.en}
                                    onApprove={() => deleteBlog(blog.id)}
                                    isPending={isDeleteBlogPending}
                                    isSuccessful={isDeleteBlogSuccessful}
                                />
                            }
                        />
                    ))}
            </div>
            {/* DESKTOP */}
            <Table
                className={cn('flex-[1] max-md:hidden', {
                    'border-b': data.blogs.length > 0,
                })}
            >
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '50%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '30%' }} />
                </colgroup>
                <TableHeader>
                    <TableRow className="bg-accent text-accent-foreground duration-300">
                        <TableHead className="w-[60px] text-nowrap">No</TableHead>
                        <TableHead className="text-nowrap">Blog</TableHead>
                        <TableHead className="text-nowrap">Input by</TableHead>
                        <TableHead className="min-w-[140px] text-nowrap text-right max-md:hidden xl:min-w-[200px]">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && <SkeletonFallbackDesktop />}
                    {!isLoading && data.blogs.length < 1 && (
                        // TODO: fix hasFilters
                        <TableDataNotFound colSpan={7} hasFilters={data.fetchDetail.isUsingFilter} tableName="blog" />
                    )}
                    {!isLoading &&
                        data.blogs.length > 0 &&
                        data.blogs.map((blog, idx) => (
                            <TableRow key={blog.id}>
                                <TableCell className="text-center">
                                    {idx + 1 + data.fetchDetail.fetchSize * (data.fetchDetail.currentPage - 1)}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex gap-4">
                                        <div className="relative max-h-[150px] min-h-[120px] min-w-[200px] overflow-hidden rounded-md bg-secondary">
                                            <ImageWithFallbackPlaceholder
                                                variant="absolute-center"
                                                className="object-cover object-center dark:brightness-90"
                                                alt={`Thumbnail of blog '${blog.title.en}'`}
                                                src={blog.imageUrl}
                                                fill
                                                placeholder="blur"
                                                blurDataURL={blog.blurImageUrl}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-start gap-2">
                                                <Flag round flag="en" />
                                                <h3 className="line-clamp-2">{blog.title.en}</h3>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Flag round flag="id" />
                                                <h3 className="line-clamp-2">{blog.title.id}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <InputorInfo
                                        authorId={blog.author.id}
                                        authorName={blog.author.username}
                                        inputedAt={blog.createdAt}
                                        noIcon
                                    />
                                </TableCell>
                                <TableCell className="max-md:hidden">
                                    <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                                        <ViewButton
                                            href={`/members/blogs/${blog.id}`}
                                            className="col-span-2 min-w-min xl:order-3 xl:col-span-1"
                                            small
                                        />
                                        <DeleteButton
                                            small
                                            className="min-w-min"
                                            toBeDeletedName={blog.title.en}
                                            onApprove={() => deleteBlog(blog.id)}
                                            isPending={isDeleteBlogPending}
                                            isSuccessful={isDeleteBlogSuccessful}
                                        />
                                        <EditButton
                                            small
                                            href={`/members/blogs/${blog.id}/edit`}
                                            className="min-w-min"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}
