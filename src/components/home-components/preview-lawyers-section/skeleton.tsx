import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFallback() {
    return (
        <div className="flex w-full gap-4 overflow-hidden px-8 lg:w-[95%] xl:w-[87%]">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="h-[296px] min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                />
                // <div
                //     key={index}
                //     className="min-w-0 shrink-0 grow-0 basis-full pb-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                // >
                //     <div className="relative mx-auto flex w-full max-w-[220px] flex-col items-center">
                //         <Skeleton className="absolute right-0 top-2 h-7 w-2 -translate-x-1/2" />
                //         <Skeleton className="mb-4 h-[180px] w-[180px] rounded-full" />
                //         <div className="flex flex-[1] flex-col items-center">
                //             <Skeleton className="h-4 w-20" />
                //             <Skeleton className="mt-2 h-6 w-32" />
                //             <Skeleton className="mt-2 h-4 w-24" />
                //         </div>
                //     </div>
                // </div>
            ))}
        </div>
    )
}
