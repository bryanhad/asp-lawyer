import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

function SkeletonFallbackDesktop() {
    return (
        <>
            {/* MOBILE SKELETON */}

            {/* DESKTOP SKELETON */}
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`${`desktop_skeleton_${index}`}`} className="max-md:hidden">
                    <TableCell>
                        <div className="flex items-center justify-center">
                            <Skeleton className="aspect-square h-[20px] w-[17px]" />
                        </div>
                    </TableCell>
                    <TableCell className="font-medium">
                        <div className="flex gap-4">
                            <Skeleton className="max-h-[150px] min-h-[120px] min-w-[200px]" />
                            <div className="flex flex-[1] flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="aspect-square w-[24px] rounded-full" />
                                    <Skeleton className="h-[17px] w-full max-w-[300px]" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="aspect-square w-[24px] rounded-full" />
                                    <Skeleton className="h-[17px] w-full max-w-[300px]" />
                                </div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Skeleton className="aspect-square w-[45px] rounded-full" />
                            <Skeleton className="h-[20px] w-[70px]" />
                        </div>
                    </TableCell>
                    <TableCell className="max-md:hidden">
                        <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                            <Skeleton className="aspect-square h-[40px] w-[80px]" />
                            <Skeleton className="aspect-square h-[40px] w-[80px]" />
                            <Skeleton className="aspect-square h-[40px] w-[80px]" />
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
                    <div className="grid grid-cols-3 p-2">
                        <Skeleton className="max-h-[150px] min-h-[120px] w-full" />

                        <div className="col-span-2 ml-2 flex flex-col justify-between px-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="aspect-square w-[24px] rounded-full" />
                                    <Skeleton className="h-[17px] w-full max-w-[220px]" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="aspect-square w-[24px] rounded-full" />
                                    <Skeleton className="h-[17px] w-full max-w-[220px]" />
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <Skeleton className="h-[17px] w-full max-w-[70px]" />

                                <div className="flex items-center gap-2">
                                    <Skeleton className="aspect-square w-[38px] rounded-full" />
                                    <Skeleton className="h-[20px] w-[70px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 p-2">
                        <Skeleton className="aspect-square h-[40px] flex-[1]" />
                        <Skeleton className="aspect-square h-[40px] flex-[1]" />
                        <Skeleton className="aspect-square h-[40px] flex-[1]" />
                    </div>
                </div>
            ))}
        </>
    )
}

export {SkeletonFallbackDesktop, SkeletonFallbackMobile}