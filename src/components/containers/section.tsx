import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type Props = {
    className?: string
    lessTopSpacing?: boolean
} & PropsWithChildren

export default function Section({
    children,
    className,
    lessTopSpacing = false,
}: Props) {
    return (
        <section
            className={cn(
                'w-full max-w-custom px-4 py-20',
                lessTopSpacing && 'pt-10',
                className,
            )}
        >
            {children}
        </section>
    )
}
