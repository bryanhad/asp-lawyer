import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

function SkeletonFallbackDesktop() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`${`desktop_skeleton_${index}`}`} className="max-md:hidden">
                    <TableCell>
                        <div className="flex items-center justify-center">
                            <Skeleton className="aspect-square h-[20px] w-[17px]" />
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-4">
                            <Skeleton className="aspect-square w-[40px] rounded-full" />
                            <Skeleton className="h-[20px] w-[120px]" />
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="items-centerg flex gap-2">
                            {/* user status bullet */}
                            <Skeleton className="aspect-square w-[15px] rounded-full" />
                            <Skeleton className="h-[20px] w-[120px]" />
                        </div>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-[25px] w-[70px]" />
                    </TableCell>
                    <TableCell>
                        <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                            <Skeleton className="col-span-2 h-[40px] min-w-min xl:order-3 xl:col-span-1" />
                            <Skeleton className="aspect-square h-[40px] w-full" />
                            <Skeleton className="aspect-square h-[40px] w-full" />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}

function SkeletonFallbackMobile() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={`mobile_skeleton_${index}`}
                    className={'flex flex-col overflow-hidden rounded-md border border-muted md:hidden'}
                >
                    <div className="flex items-start justify-between p-2">
                        <div className="flex flex-[1] items-center gap-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="aspect-square w-[45px] rounded-full" />
                            </div>
                            <div className={'flex flex-col gap-2'}>
                                <Skeleton className="min-h-[22px] w-[120px]" />
                                <Skeleton className="min-h-[18px] w-[82px]" />
                            </div>
                        </div>
                        {/* user status bullet */}
                        <Skeleton className="aspect-square w-[15px] rounded-full" />
                    </div>
                    <div className="flex gap-4 p-2">
                        <Skeleton className="min-h-[40px] flex-[1]" />
                        <Skeleton className="min-h-[40px] flex-[1]" />
                        <Skeleton className="min-h-[40px] flex-[1]" />
                    </div>
                </div>
            ))}
        </>
    )
}

export { SkeletonFallbackDesktop, SkeletonFallbackMobile }
