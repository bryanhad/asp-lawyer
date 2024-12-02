'use client'

import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
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

    return (
        <Button
            asChild
            size={'sm'}
            variant={'ghost'}
            className={cn('w-full justify-start px-3', {
                'bg-accent text-accent-foreground':
                    pathname === item.href,
            })}
        >
            <Link href={item.href} className="text-sm">
                {item.icon}
                {item.title}
            </Link>
        </Button>
    )
}
