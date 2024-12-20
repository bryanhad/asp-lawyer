'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getQueryClient } from '@/lib/tanstack-query-client'
import { useMutation } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getData } from './action'
import { BLOGS_QUERY_KEY } from './constants'
import { useBlogsData } from './display-component'
import { useBlogsTableContext } from './table-context'

function Pagination() {
    const { setIsLoading } = useBlogsTableContext()
    const {
        data: { fetchDetail },
    } = useBlogsData()
    const queryClient = getQueryClient()
    const { mutate: paginate } = useMutation({
        mutationFn: getData,
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(BLOGS_QUERY_KEY, newData)
        },
        onSettled: () => {
            setIsLoading(false)
        },
    })
    const { fetchSize, fetchedDataCount, totalAvailablePages, totalDataCount, currentPage } = fetchDetail

    return (
        <div className="mb-4 flex items-center justify-between px-2">
            <div className="hidden flex-[1] text-sm text-muted-foreground md:block">
                {fetchedDataCount} of {totalDataCount} row(s) shown.
            </div>
            <div className="flex flex-[1] items-center justify-between gap-3 md:flex-row">
                <div className="flex items-center gap-2 md:flex-row">
                    <p className="sm:hidden">Rows</p>
                    <p className="hidden text-nowrap text-sm font-medium sm:block">Rows per page</p>
                    <Select
                        onValueChange={(value) => {
                            const newFetchSize = Number(value)
                            paginate({ filterValues: { size: isNaN(newFetchSize) ? 5 : newFetchSize } })
                        }}
                    >
                        <SelectTrigger className="h-8 min-w-[70px]">
                            <SelectValue placeholder={fetchSize} />
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
                    Page {currentPage} of {totalAvailablePages}
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
                        disabled={currentPage <= 1}
                        onClick={() =>
                            paginate({
                                filterValues: { page: currentPage - 1 },
                            })
                        }
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft size={16} className="shrink-0" />
                    </Button>

                    <div className="flex w-[100px] items-center justify-center text-sm font-medium md:hidden">
                        Page {currentPage} of {totalAvailablePages}
                    </div>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={currentPage >= totalAvailablePages}
                        onClick={() =>
                            paginate({
                                filterValues: { page: currentPage + 1 },
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

export default Pagination
