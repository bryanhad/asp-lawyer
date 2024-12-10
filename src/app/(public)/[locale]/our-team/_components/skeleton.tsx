import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFallback() {
    return (
        <div>
            <div className="mb-8 flex select-none flex-wrap items-center justify-center gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-[80px]" />
                ))}
            </div>
            <div className="grid w-full grid-cols-1 gap-5 max-lg:px-12 sm:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-12">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative grid w-full max-w-[250px] place-items-center place-self-center pt-14 md:pt-16 lg:max-w-[300px] xl:max-w-full"
                    >
                        <Skeleton className="absolute right-0 top-0 h-[28px] w-[8px]" />
                        <Skeleton className="h-[240px] md:h-[24vw] lg:h-[290px] w-full" />
                        <div className="mt-2 w-full space-y-2">
                            <Skeleton className="h-7 w-48" />
                            <div className="flex justify-between">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
