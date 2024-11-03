'use client'

import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { useNavContext } from './nav-context'

type NavLinkProps = {
    children: React.ReactNode
    href: string
}

function NavLink({ children, href }: NavLinkProps) {
    const { isHomePage, isScrolled } = useNavContext()
    const selectedLayoutSegment = useSelectedLayoutSegment()
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
    const isActive = pathname === href

    return (
        <Button asChild variant="naked" size="naked">
            <Link
                href={href}
                className={cn('text-base text-muted-foreground', {
                    'text-black': isActive,
                    'text-slate-400': isHomePage && !isScrolled,
                })}
            >
                {children}
            </Link>
        </Button>
    )
}

export default NavLink
