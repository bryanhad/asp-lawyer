import { Skeleton } from "../skeleton";

export default function SkeletonFallback() {
  return (
    <div className="flex min-h-[15rem] flex-col space-y-2">
        <Skeleton className="h-10"/>
        <Skeleton className="flex-[1]"/>
    </div>
  )
}
