'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

type MobileMenuLinkProps = {
    children: React.ReactNode
    icon: React.ReactNode
    href: string
}

function MobileMenuLink({ children, icon, href }: MobileMenuLinkProps) {
    const selectedLayoutSegment = useSelectedLayoutSegment()
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
    const isActive = pathname === href

    return (
        <div className="relative flex flex-col">
            <Button
                asChild
                variant={'ghost'}
                className="flex items-center justify-start gap-2 rounded-none"
            >
                <Link
                    href={href}
                    className={cn({
                        'text-amber-400 hover:text-amber-400': isActive,
                    })}
                >
                    {icon}
                    <div>{children}</div>
                </Link>
            </Button>
            {isActive && (
                <div className="absolute left-0 z-10 h-full w-2 translate-x-[-50%] rounded-full bg-amber-400" />
            )}
        </div>
    )
}

export default MobileMenuLink
