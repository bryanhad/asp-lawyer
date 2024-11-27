import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFallback() {
    return (
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-12">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="grid place-items-center pb-4 pt-10">
                    <Skeleton className="h-[290px] w-full" />
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
    )
}
