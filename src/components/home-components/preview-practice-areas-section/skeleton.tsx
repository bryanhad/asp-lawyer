import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function PreviewPracticeAreasSkeleton() {
    return (
        <div className="flex flex-col items-center gap-6">
            <>
                <div className="flex flex-wrap justify-center gap-3 xl:gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="h-10 py-2 w-36 rounded-full" />
                    ))}
                </div>
                <Skeleton
                    className='h-60 w-full max-w-[600px]'
                />
            </>
        </div>
    )
}
