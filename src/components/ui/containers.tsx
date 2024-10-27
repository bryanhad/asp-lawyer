import { cn } from '@/lib/utils'
import { PropsWithChildren, ReactNode } from 'react'

type Props = {
    className?: string
} & PropsWithChildren

export function MainContainer({ children, className }: Props) {
    return (
        <div className={cn('flex flex-col items-center', className)}>
            {children}
        </div>
    )
}

type SectionProps = {
    className?: string
    title: ReactNode
    desc: ReactNode
} & PropsWithChildren

export function SectionContainer({
    children,
    className,
    title,
    desc,
}: SectionProps) {
    return (
        <div
            className={cn(
                'flex w-full max-w-[1720px] flex-col items-center px-4 py-12',
                className,
            )}
        >
            <div className="mb-3 xl:max-w-[40%]">{title}</div>
            <div className="mb-7 text-muted-foreground xl:max-w-[50%]">
                {desc}
            </div>
            {children}
        </div>
    )
}
