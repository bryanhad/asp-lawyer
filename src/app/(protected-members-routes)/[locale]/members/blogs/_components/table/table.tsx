import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import Pagination from './pagination'
import { getData } from './action'
import { SearchParams } from '../../validation'
import TableDataNotFound from './table-data-not-found'
import InputorInfo from './inputor-info'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'

export type Props = {
    searchParams: SearchParams
}

export default async function BlogsTable({ searchParams }: Props) {
    const { totalDataCount, blogs, totalAvailablePages, isUsingFilter, fetchSize } = await getData({
        filterValues: searchParams,
        defaultFetchSize: 10,
    })
    return (
        <div className="flex min-h-[360px] flex-col gap-2 overflow-hidden rounded-md">
            <div className="flex-[1] bg-white">
                <Table
                    className={cn('flex-[1]', {
                        'border-b': totalDataCount > 0,
                    })}
                >
                    {/* <TableCaption>
                    Data Kreditor PT Pailit (dalam Pailit)
                </TableCaption> */}
                    <TableHeader>
                        <TableRow className="bg-neutral-400 hover:bg-neutral-400/90">
                            <TableHead className="w-[60px] text-nowrap text-white">No</TableHead>
                            <TableHead className="text-nowrap text-white">Blog</TableHead>
                            <TableHead className="text-nowrap text-white">Input by</TableHead>
                            <TableHead className="text-nowrap text-right text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs.length < 1 ? (
                            <TableDataNotFound colSpan={7} hasFilters={isUsingFilter} tableName="blog" />
                        ) : (
                            blogs.map((blog, idx) => (
                                <TableRow key={blog.id}>
                                    <TableCell className="text-center">{idx+1}</TableCell>
                                    <TableCell className="font-medium">{blog.title}</TableCell>
                                    <TableCell>
                                        <InputorInfo
                                            authorId={blog.author.id}
                                            authorName={blog.author.username}
                                            inputedAt={blog.createdAt}
                                            tip="Created At"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Button asChild>
                                                <Link href={`/members/blogs/${blog.id}`}>View</Link>
                                            </Button>
                                            <Button asChild>
                                                <Link href={`/members/blogs/${blog.id}/edit`}>Edit</Link>
                                            </Button>
                                            <Button asChild>
                                                <Link href={`/members/blogs/${blog.id}/edit`}>Delete</Link>
                                            </Button>
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
