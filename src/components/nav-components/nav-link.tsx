'use client'

import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

type NavLinkProps = {
    children: React.ReactNode
    href: string
}

function NavLink({ children, href }: NavLinkProps) {
    const selectedLayoutSegment = useSelectedLayoutSegment()
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
    const isActive = pathname === href

    return (
        <Button
            asChild
            variant="ghost"
            className="h-max p-0 hover:bg-transparent"
        >
            <Link
                href={href}
                className={cn('text-base text-muted-foreground', {
                    'text-black': isActive,
                })}
            >
                {children}
            </Link>
        </Button>
    )
}

export default NavLink
