import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFallback() {
    return (
        <div className="flex w-full overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="grid shrink-0 grow-0 basis-full place-items-center md:basis-1/2 lg:basis-1/3"
                >
                    <Skeleton className="h-[330px] w-[300px] xl:w-[380px]" />
                </div>
            ))}
        </div>
    )
}
