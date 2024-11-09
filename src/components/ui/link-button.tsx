import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import { Button, ButtonProps } from './button'

type Props = { className?: string } & Omit<LinkProps, 'locale'> &
    PropsWithChildren &
    Pick<ButtonProps, 'variant' | 'size'>

export default function LinkButton({
    href,
    children,
    className,
    variant='link',
    size = 'default',
    ...props
}: Props) {
    return (
        <Button
            variant={variant}
            size={size}
            className={cn('w-max py-3', className)}
            asChild
        >
            <Link href={href} {...props}>
                {children}
                <ChevronRight className="shrink-0" size={26} />
            </Link>
        </Button>
    )
}
