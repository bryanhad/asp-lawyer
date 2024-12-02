import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type Props = {
    className?: string
    lessYSpacing?: boolean
} & PropsWithChildren

export default function Section({
    children,
    className,
    lessYSpacing = false,
}: Props) {
    return (
        <section
            className={cn(
                'w-full max-w-custom px-4 py-20',
                lessYSpacing && 'pb-14 pt-10',
                className,
            )}
        >
            {children}
        </section>
    )
}
