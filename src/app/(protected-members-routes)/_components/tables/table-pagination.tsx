'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UseMutateFunction } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FilterSearchParams, TableFetchDetail } from '../../lib/types'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type Props = {
    fetchDetail?: TableFetchDetail
    paginateFn: UseMutateFunction<unknown, Error, Partial<{ filterValues: FilterSearchParams }> | undefined>
}

function TablePagination({ fetchDetail, paginateFn }: Props) {
    const DATA_READY = !!fetchDetail

    return (
        <div className="mb-4 flex items-center justify-between px-2">
            <div className="hidden flex-[1] gap-2 text-sm text-muted-foreground md:flex md:items-center">
                {DATA_READY ? fetchDetail.fetchedDataCount : <SkeletonNumber className='max-h-[12px] m-0'/>} of{' '}
                {DATA_READY ? fetchDetail.totalDataCount : <SkeletonNumber className='max-h-[12px] m-0'/>} row(s) shown.
            </div>
            <div className="flex flex-[1] items-center justify-between gap-3 md:flex-row">
                <div className="flex items-center gap-2 md:flex-row">
                    <p className="sm:hidden">Rows</p>
                    <p className="hidden text-nowrap text-sm font-medium sm:block">Rows per page</p>

                    <Select
                        onValueChange={(value) => {
                            const newFetchSize = Number(value)
                            paginateFn({ filterValues: { size: isNaN(newFetchSize) ? 5 : newFetchSize } })
                        }}
                    >
                        <SelectTrigger className="h-8 min-w-[70px]">
                            {DATA_READY ? <SelectValue placeholder={fetchDetail.fetchSize} /> : <SkeletonNumber />}
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 15].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="hidden w-[100px] items-center justify-center text-sm font-medium md:ml-auto md:flex">
                    Page {DATA_READY ? fetchDetail.currentPage : <SkeletonNumber className='mx-[3px]' />} of{' '}
                    {DATA_READY ? fetchDetail.totalAvailablePages : <SkeletonNumber className='mx-[3px]' />}
                </div>
                <div className="flex items-center gap-2">
                    {/* GO TO FIRST PAGE */}
                    {/* <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        disabled={currentPage <= 1}
                    >
                        <Link href={generatePageUrl(currentPage - 1)}>
                            <span className="sr-only">Go to first page</span>
                            <DoubleArrowLeftIcon className="h-4 w-4" />
                        </Link>
                    </Button> */}
                    {/* GO TO PREV PAGE */}
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={!DATA_READY || fetchDetail.currentPage <= 1}
                        onClick={() =>
                            paginateFn({
                                filterValues: { page: fetchDetail ? fetchDetail.currentPage - 1 : 1 },
                            })
                        }
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft size={16} className="shrink-0" />
                    </Button>

                    <div className="flex w-[100px] items-center justify-center text-sm font-medium md:hidden">
                        Page {DATA_READY ? fetchDetail.currentPage : <SkeletonNumber className='mx-[3px]'/>} of{' '}
                        {DATA_READY ? fetchDetail.totalAvailablePages : <SkeletonNumber className='mx-[3px]' />}
                    </div>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={!DATA_READY || fetchDetail.currentPage >= fetchDetail.totalAvailablePages}
                        onClick={() =>
                            paginateFn({
                                filterValues: { page: DATA_READY ? fetchDetail.currentPage + 1 : 2 },
                            })
                        }
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight size={16} className="shrink-0" />
                    </Button>

                    {/* GO TO LAST PAGE */}
                    {/* <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        disabled={currentPage >= totalAvailablePages}
                    >
                        <Link href={generatePageUrl(currentPage + 1)}>
                            <span className="sr-only">Go to last page</span>
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </Button> */}
                </div>
            </div>
        </div>
    )
}


function SkeletonNumber({className}: {className?:string}) {
    return <Skeleton className={cn("min-h-[14px] w-[8px] rounded-sm mx-[1.5px]", className)} />
}

export default TablePagination
