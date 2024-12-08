import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

type Props = {
    className?: string
} & PropsWithChildren

export function BaseContainer({ children, className }: Props) {
    return (
        <div className={cn('flex flex-col items-center', className)}>
            {children}
        </div>
    )
}