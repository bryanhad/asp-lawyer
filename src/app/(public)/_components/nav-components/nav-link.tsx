'use client'

import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import { useIsScrolled } from '@/hooks/use-is-scrolled'

type NavLinkProps = {
    children: React.ReactNode
    href: string
}

function NavLink({ children, href }: NavLinkProps) {
    const isScrolled = useIsScrolled()
    const pathname = usePathname()

    return (
        <Button asChild variant="naked" size="naked" className="select-none">
            <Link
                href={href}
                className={cn(
                    'text-muted-foreground text-slate-300 dark:text-muted-foreground',
                    {
                        'text-slate-700': isScrolled || pathname !== '/',
                        'font-semibold text-black dark:font-normal dark:text-primary':
                            pathname === href,
                    },
                )}
            >
                {children}
            </Link>
        </Button>
    )
}

export default NavLink
