import { cn } from '@/lib/utils'
import { PropsWithChildren, ReactNode } from 'react'
import SectionHeading from './section-heading'

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
    children?: ReactNode
    variant?: 'title-and-desc' | 'naked'
    title?: string
    desc?: ReactNode
} & (
    | { side?: 'right' | 'left'; secondaryContent: ReactNode }
    | { side?: 'center'; secondaryContent?: never }
)

export function SectionContainer({
    children,
    className,
    title,
    desc,
    side = 'center',
    secondaryContent,
    variant = 'title-and-desc',
}: SectionProps) {
    if (variant === 'naked') {
        return (
            <div
                className={cn(
                    'flex w-full max-w-[1720px] flex-col  px-4 py-12',
                    className,
                )}
            >
                {children}
            </div>
        )
    }

    if (side === 'center') {
        return (
            <div
                className={cn(
                    'flex w-full max-w-[1720px] flex-col items-center px-4 py-12 md:py-20',
                    className,
                )}
            >
                <div className="mb-4 xl:max-w-[40%]">
                    <SectionHeading side={side}>{title}</SectionHeading>
                </div>
                <div className="mb-7 text-center text-muted-foreground xl:max-w-[50%]">
                    {desc}
                </div>
                {children}
            </div>
        )
    }

    return (
        <div
            className={cn(
                'grid w-full max-w-[1420px] grid-cols-1 px-4 py-12 md:grid-cols-2 md:py-20',
                className,
            )}
        >
            <>
                <span
                    className={cn('flex flex-col items-center justify-center', {
                        'order-1 md:items-start': side === 'left',
                        'order-2 md:items-end': side === 'right',
                    })}
                >
                    <div
                        className={cn('mb-4 xl:mb-6', {
                            'text-start': side === 'left',
                            'text-end': side === 'right',
                        })}
                    >
                        <SectionHeading side={side}>{title}</SectionHeading>
                    </div>
                    <div
                        className={cn(
                            'mb-7 text-center text-muted-foreground',
                            {
                                'md:max-w-[90%] md:text-start': side === 'left',
                                'md:text-end': side === 'right',
                            },
                        )}
                    >
                        {desc}
                    </div>
                    {children}
                </span>
                <span
                    className={cn('hidden md:block', {
                        'order-2': side === 'left',
                        'order-1': side === 'right',
                    })}
                >
                    {secondaryContent}
                </span>
            </>
        </div>
    )
}
