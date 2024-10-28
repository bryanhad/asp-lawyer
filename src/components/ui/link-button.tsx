import { Link } from '@/i18n/routing'
import { Button, ButtonProps } from './button'
import { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import {ChevronRight} from 'lucide-react'

type Props = { className?: string } & Omit<LinkProps, 'locale'> &
    PropsWithChildren &
    Pick<ButtonProps, 'variant' | 'size'>

export default function LinkButton({
    href,
    children,
    className,
    variant = 'link',
    size = 'lg',
    ...props
}: Props) {
    return (
        <Button
            variant={variant}
            size={size}
            className={cn('rounded-full text-lg h-auto py-3', className)}
            asChild
        >
            <Link href={href} {...props}>
                {children}
                <ChevronRight className='shrink-0' size={26}/>
            </Link>
        </Button>
    )
}
