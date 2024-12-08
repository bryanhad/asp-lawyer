import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
    title: string
    href: string
    icon: ReactNode
    currentPathname: string
}

export default function SidebarLink({ href, icon, title, currentPathname }: Props) {
    const pathnameArr = currentPathname.split('/')
    const hrefArr = href.split('/')

    const isActive = currentPathname === href || pathnameArr[2] === hrefArr[2]

    return (
        <Button
            asChild
            size={'sm'}
            variant={'ghost'}
            className={cn('w-full justify-start px-3', {
                'bg-accent text-primary': isActive,
            })}
        >
            <Link href={href} className="text-sm">
                {icon}
                {title}
            </Link>
        </Button>
    )
}
