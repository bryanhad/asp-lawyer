import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFallback() {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="grid place-items-center">
                    <div className="flex w-full flex-col overflow-hidden rounded-md">
                        <Skeleton className="h-[200px]" />
                        <div className="flex flex-[1] flex-col p-5 dark:bg-secondary">
                            <Skeleton className="h-[30px] w-full" />
                            <Skeleton className="mt-2 h-[30px] w-[40%]" />
                            <div className="mt-4 flex justify-between gap-3">
                                <Skeleton className="h-[15px] w-[100px]" />
                                <Skeleton className="h-[12px] w-[80px]" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
