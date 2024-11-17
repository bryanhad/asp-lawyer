import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFallback() {
    return (
        <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
            <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
                <div className="relative h-80">
                    <Skeleton className="absolute h-80 w-full" />
                    <Skeleton className="absolute h-80 w-full -rotate-[10deg]" />
                </div>
                <div className="flex flex-col justify-between py-4">
                    <div>
                        <Skeleton className="h-7 w-[55%]" />
                        <Skeleton className="mt-2 h-6 w-[80%]" />
                    </div>
                    <Skeleton className="my-8 w-[95%] flex-[1]" />
                    <div className="flex gap-4 pt-12 md:pt-0">
                        <Skeleton className="size-7 rounded-full" />
                        <Skeleton className="size-7 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
