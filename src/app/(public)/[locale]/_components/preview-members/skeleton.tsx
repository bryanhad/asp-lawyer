import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFallback() {
    return (
        <div className="flex w-full gap-4 overflow-hidden px-8 lg:w-[95%] xl:w-[87%]">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="h-[296px] min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                />
            ))}
        </div>
    )
}
