'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import React from 'react'

type NavLinkProps = {
    children: React.ReactNode
    href: string
    currentPathname:string
    isScrolled: boolean
}

function NavLink({ children, href, currentPathname, isScrolled }: NavLinkProps) {
    const pathnameArr = currentPathname.split('/')
    const hrefArr = href.split('/')

    const isActive = currentPathname === href || pathnameArr[1] === hrefArr[1]

    return (
        <Button asChild variant="naked" size="naked" className="select-none">
            <Link
                href={href}
                className={cn(
                    'text-muted-foreground text-slate-300 dark:text-muted-foreground',
                    {
                        'text-slate-700': isScrolled || currentPathname !== '/',
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
