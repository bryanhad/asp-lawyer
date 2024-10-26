import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

type Props = {
    className?: string
} & PropsWithChildren

export function MainContainer({ children, className }: Props) {
    return (
        <div className={cn('flex flex-col items-center', className)}>{children}</div>
    )
}

export function SectionContainer({ children, className }: Props) {
    return (
        <div className={cn('w-full max-w-[1820px]', className)}>{children}</div>
    )
}
