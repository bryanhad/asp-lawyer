import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { DeleteButton, EditButton, ViewButton } from './_components/buttons'
import InputorInfo from './_components/inputor-info'
import Pagination from './_components/pagination'
import TableDataNotFound from './_components/table-data-not-found'
import { deleteBlogAction, getData } from './action'
import { SearchParams } from './validation'
import BlogCard from './_components/card'
import Image from 'next/image'

export type Props = {
    searchParams: SearchParams
}

export default async function FetchComponent({ searchParams }: Props) {
    const { totalDataCount, blogs, totalAvailablePages, isUsingFilter, fetchSize } = await getData({
        filterValues: searchParams,
        defaultFetchSize: 10,
    })
    return (
        <div className="flex flex-col gap-2 overflow-hidden rounded-md md:min-h-[360px]">
            <div className="flex-[1] bg-background max-md:flex max-md:flex-col max-md:gap-4 md:border">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} {...blog} className="md:hidden" />
                ))}
                <Table
                    className={cn('flex-[1] max-md:hidden', {
                        'border-b': totalDataCount > 0,
                    })}
                >
                    <TableHeader>
                        <TableRow className="bg-accent text-accent-foreground duration-300">
                            <TableHead className="w-[60px] text-nowrap">No</TableHead>
                            <TableHead className="text-nowrap">Blog</TableHead>
                            <TableHead className="text-nowrap">Input by</TableHead>
                            <TableHead className="min-w-[140px] xl:min-w-[200px] text-nowrap text-right max-md:hidden">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs.length < 1 ? (
                            <TableDataNotFound colSpan={7} hasFilters={isUsingFilter} tableName="blog" />
                        ) : (
                            blogs.map((blog, idx) => (
                                <TableRow key={blog.id}>
                                    <TableCell className="text-center">{idx + 1}</TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex gap-4">
                                            <div className="relative max-h-[150px] min-h-[120px] min-w-[200px] overflow-hidden rounded-md bg-secondary">
                                                <Image
                                                    className="object-cover object-center dark:brightness-90"
                                                    alt={`Thumbnail of blog '${blog.title}'`}
                                                    src={blog.imageUrl}
                                                    fill
                                                />
                                            </div>
                                            <h3>{blog.title}</h3>
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
                                                className="col-span-2 min-w-min xl:col-span-1 xl:order-3"
                                                small
                                            />
                                                <DeleteButton
                                                    small
                                                    className="min-w-min"
                                                    toBeDeletedName={blog.title}
                                                    onApprove={deleteBlogAction.bind(null, blog.id)}
                                                />
                                            <EditButton
                                                small
                                                href={`/members/blogs/${blog.id}/edit`}
                                                className="min-w-min"
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                itemsPerPage={fetchSize}
                totalRowCount={totalDataCount}
                totalRowShown={blogs.length}
                totalAvailablePages={totalAvailablePages}
            />
        </div>
    )
}
