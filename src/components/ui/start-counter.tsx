import React, { ReactNode } from 'react'
import CountUp, { CountUpProps } from './count-up'
import { cn } from '@/lib/utils'

type Props = CountUpProps & {
    prefix?: ReactNode
    suffix?: string
    desc?: string
    className?: string
}

export default function StartCounter({
    desc,
    prefix,
    suffix = '+',
    className,
    ...countUpProps
}: Props) {
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <div className="flex items-center gap-2">
                {prefix}
                <p className="text-2xl font-semibold leading-none text-primary">
                    <CountUp {...countUpProps} />
                    <span>{suffix}</span>
                </p>
            </div>
            {desc && (
                <p className="text-sm leading-none text-muted-foreground">
                    {desc}
                </p>
            )}
        </div>
    )
}
