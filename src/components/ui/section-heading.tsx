import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'
import LinkSection from '@/components/ui/link-section'

type Props = {
    className?: string
    side?: 'left' | 'right' | 'center'
} & PropsWithChildren

export default function SectionHeading({
    children,
    side = 'center',
    className,
}: Props) {
    const href =
        typeof children === 'string'
            ? children.toLowerCase().split(' ').join('-')
            : null

    return (
        <div
            className={cn('flex flex-col items-center gap-2 xl:gap-3', {
                'md:items-start': side === 'left',
                'md:items-end': side === 'right',
            })}
        >
            <LinkSection title={children} className='text-primary' size={24}>
                <h2
                    id={href ?? undefined}
                    className={cn(
                        'max-w-max text-center text-3xl font-semibold text-primary lg:text-4xl xl:text-5xl xl:font-bold scroll-m-28',
                        className,
                    )}
                >
                    {children}
                </h2>
            </LinkSection>
            <div
                className={cn(
                    'h-1 w-12 bg-primary max-md:rounded-full xl:h-2 xl:w-20',
                    {
                        'md:rounded-full': side === 'center',
                        'md:rounded-r-full': side === 'left',
                        'md:rounded-l-full': side === 'right',
                    },
                )}
            />
        </div>
    )
}
