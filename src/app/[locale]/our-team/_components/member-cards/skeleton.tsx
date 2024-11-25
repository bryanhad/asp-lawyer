import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFallback() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="grid place-items-center pb-4 pt-10">
                    <div>
                        <Skeleton className="h-[290px] w-[300px]" />
                        <div className="mt-2 w-full space-y-2">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
