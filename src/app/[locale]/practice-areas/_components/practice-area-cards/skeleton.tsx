import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFallback() {
    return (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='grid place-items-center pt-10 pb-4'>
                    <Skeleton  className="h-[290px] w-[300px]" />
                </div>
            ))}
        </div>
    )
}
