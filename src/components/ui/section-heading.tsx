import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

type Props = {
    className?: string
    side?: 'left' | 'right' | 'center'
} & PropsWithChildren

export default function SectionHeading({
    children,
    side = 'center',
    className,
}: Props) {
    return (
        <div
            className={cn('flex flex-col gap-2 xl:gap-3 items-center', {
                'md:items-start': side === 'left',
                'md:items-end': side === 'right',
            })}
        >
            <h2
                className={cn(
                    'max-w-max text-center text-3xl font-semibold text-primary lg:text-4xl xl:text-5xl xl:font-bold',
                    className,
                )}
            >
                {children}
            </h2>
            <div
                className={cn('h-1 xl:h-2 w-12 xl:w-20 bg-primary max-md:rounded-full', {
                    'md:rounded-full': side === 'center',
                    'md:rounded-r-full': side === 'left',
                    'md:rounded-l-full': side === 'right',
                })}
            />
        </div>
    )
}
