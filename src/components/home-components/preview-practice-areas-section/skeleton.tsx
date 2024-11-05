import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SkeletonFallback() {
    return (
        <div className="flex w-full flex-col items-center gap-6">
            <div className="relative w-full max-w-[85%] flex justify-center">
                <div className="mx-auto flex w-full justify-start md:justify-center gap-3 overflow-hidden whitespace-nowrap max-md:px-4 md:flex-wrap xl:gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-10 w-full max-md:min-w-32 md:max-w-32 rounded-full py-2"
                        />
                    ))}
                </div>
                <Skeleton className="absolute -left-1 top-1/2 size-8 -translate-x-full -translate-y-1/2 rounded-full md:hidden" />
                <Skeleton className="absolute -right-1 top-1/2 size-8 -translate-y-1/2 translate-x-full rounded-full md:hidden" />
            </div>

            <Skeleton className="h-60 w-full max-w-[600px]" />
        </div>
    )
}
