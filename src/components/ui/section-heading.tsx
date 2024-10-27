import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

type Props = { className?: string } & PropsWithChildren

export default function SectionHeading({ children, className }: Props) {
    return (
        <div className="flex flex-col items-center gap-2">
            <h2
                className={cn(
                    'max-w-max text-center text-3xl font-semibold text-primary lg:text-xl xl:text-3xl',
                    className,
                )}
            >
                {children}
            </h2>
            <div className="h-2 w-12 rounded-full bg-primary" />
        </div>
    )
}
