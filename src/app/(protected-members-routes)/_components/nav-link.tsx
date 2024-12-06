'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

type Props = {
    item: {
        title: string
        href: string
        icon: ReactNode
    }
}

export default function NavLink({ item }: Props) {
    const pathname = usePathname()
    const pathnameArr = pathname.split('/')
    const hrefArr = item.href.split('/')

    const isActive = pathname === item.href || pathnameArr[2] === hrefArr[2]

    return (
        <Button
            asChild
            size={'sm'}
            variant={'ghost'}
            className={cn('w-full justify-start px-3', {
                'bg-accent text-accent-foreground': isActive,
            })}
        >
            <Link href={item.href} className="text-sm">
                {item.icon}
                {item.title}
            </Link>
        </Button>
    )
}
