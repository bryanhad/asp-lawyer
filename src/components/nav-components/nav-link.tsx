'use client'

import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import { useNavContext } from './nav-context'

type NavLinkProps = {
    children: React.ReactNode
    href: string
}

function NavLink({ children, href }: NavLinkProps) {
    const { isHomePage, isScrolled } = useNavContext()
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Button asChild variant="naked" size="naked" className="select-none">
            <Link
                href={href}
                className={cn(
                    'text-muted-foreground text-slate-300 dark:text-muted-foreground',
                    {
                        'text-slate-700': isScrolled || !isHomePage,
                        'font-semibold text-black dark:font-normal dark:text-primary':
                            isActive,
                    },
                )}
            >
                {children}
            </Link>
        </Button>
    )
}

export default NavLink
