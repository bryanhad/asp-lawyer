import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import SectionHeading from '../ui/section-heading'

type SectionProps = {
    className?: string
    children?: ReactNode
    variant?: 'title-and-desc' | 'naked'
    titleTop?: string
    titleBottom?: string
    desc?: ReactNode
    backgroundClassName?: string
    descClassName?:string
} & (
    | { side?: 'right' | 'left'; secondaryContent: ReactNode }
    | { side?: 'center'; secondaryContent?: never }
)

export function SectionContainer({
    children,
    className,
    titleTop,
    titleBottom,
    desc,
    side = 'center',
    secondaryContent,
    variant = 'title-and-desc',
    backgroundClassName,
    descClassName
}: SectionProps) {
    // NO SECTION HEADING, ONLY AS A CONTAINER
    if (variant === 'naked') {
        return (
            <div className={cn('w-full', backgroundClassName)}>
                <section
                    className={cn(
                        'mx-auto flex w-full max-w-[1520px] flex-col px-4 py-12',
                        className,
                    )}
                >
                    {children}
                </section>
            </div>
        )
    }

    if (!titleTop || !titleBottom) {
        return null
    }

    if (side === 'center') {
        return (
            <section
                className={cn(
                    'flex w-full max-w-[1520px] flex-col px-4 py-12 sm:items-center md:py-20',
                    className,
                )}
            >
                <div className="my-4 xl:my-6 xl:max-w-[60%]">
                    <SectionHeading
                        titleTop={titleTop}
                        titleBottom={titleBottom}
                        side={side}
                    />
                </div>
                <div className={cn("mb-9 text-center text-muted-foreground xl:max-w-[50%]", descClassName)}>
                    {desc}
                </div>
                {children}
            </section>
        )
    }

    return (
        <section
            className={cn(
                'grid w-full max-w-[1420px] gap-6 grid-cols-1 px-4 py-12 md:grid-cols-2 md:py-20 ',
                className,
            )}
        >
            <div
                className={cn('flex flex-col', {
                    'order-1 md:items-start': side === 'left',
                    'order-2 md:items-end': side === 'right',
                })}
            >
                <div
                    className={cn({
                        'text-start': side === 'left',
                        'text-end': side === 'right',
                    })}
                >
                    <SectionHeading
                        titleTop={titleTop}
                        titleBottom={titleBottom}
                        side={side}
                    />
                </div>
                <div className="mt-4 md:hidden">{secondaryContent}</div>
                <div
                    className={cn(
                        'my-4 text-center text-lg text-muted-foreground xl:my-6',
                        {
                            'md:max-w-[90%] md:text-start': side === 'left',
                            'md:text-end': side === 'right',
                        },
                        descClassName
                    )}
                >
                    {desc}
                </div>
                {children}
            </div>
            <div
                className={cn('max-md:hidden max-md:mt-6', {
                    'order-2': side === 'left',
                    'order-1': side === 'right',
                })}
            >
                {secondaryContent}
            </div>
        </section>
    )
}
