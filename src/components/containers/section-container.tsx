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
    descClassName?: string
    textAlign?: 'left' | 'right' | 'center'
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
    descClassName,
    textAlign,
}: SectionProps) {
    // NO SECTION HEADING, ONLY AS A CONTAINER
    if (variant === 'naked') {
        return (
            <div className={cn('w-full', backgroundClassName)}>
                <section
                    className={cn(
                        'mx-auto flex w-full max-w-[1520px] flex-col px-4 py-20',
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
                    'flex w-full max-w-[1520px] flex-col px-4 py-20 sm:items-center md:py-20',
                    className,
                )}
            >
                <div className="my-4 xl:my-6 xl:max-w-[60%]">
                    <SectionHeading
                        titleTop={titleTop}
                        titleBottom={titleBottom}
                        side={side}
                        textAlign={textAlign}
                    />
                </div>
                <div
                    className={cn(
                        'mb-9 w-full max-w-[800px] text-center text-muted-foreground xl:max-w-[50%]',
                        descClassName,
                    )}
                >
                    {desc}
                </div>
                {children}
            </section>
        )
    }

    return (
        <section
            className={cn(
                'grid w-full max-w-[1420px] grid-cols-1 gap-6 px-4 py-20 md:grid-cols-2 md:py-20',
                className,
            )}
        >
            <div
                className={cn('flex flex-col', {
                    'order-1': side === 'left',
                    // prioritize textAlign value
                    'md:items-start':
                        textAlign === 'left' || (!textAlign && side === 'left'),
                    'order-2': side === 'right',
                    // prioritize textAlign value
                    'md:items-end':
                        textAlign === 'right' ||
                        (!textAlign && side === 'right'),
                })}
            >
                <SectionHeading
                    titleTop={titleTop}
                    titleBottom={titleBottom}
                    side={side}
                    textAlign={textAlign}
                />
                <div className="mt-4 md:hidden">{secondaryContent}</div>
                <div
                    className={cn(
                        'my-4 text-center text-muted-foreground xl:my-6',
                        {
                            // prioritize textAlign value
                            'md:text-start':
                                textAlign === 'left' ||
                                (!textAlign && side === 'left'),
                            // prioritize textAlign value
                            'md:text-end':
                                textAlign === 'right' ||
                                (!textAlign && side === 'right'),
                        },
                        descClassName,
                    )}
                >
                    {desc}
                </div>
                {children}
            </div>
            <div
                className={cn('max-md:mt-6 max-md:hidden', {
                    'order-2': side === 'left',
                    'order-1': side === 'right',
                })}
            >
                {secondaryContent}
            </div>
        </section>
    )
}
