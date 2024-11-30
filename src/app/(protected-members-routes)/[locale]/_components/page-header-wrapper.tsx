'use client'

import { useIsScrolled } from '@/hooks/use-is-scrolled'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type Props = {} & PropsWithChildren

export default function HeaderWrapper({ children }: Props) {
    const isScrolled = useIsScrolled()

    return (
        <header
            className={cn(
                'fixed top-0 z-[90] flex h-16 w-full justify-center bg-background transition-colors duration-300',
                isScrolled && 'border-b border-b-border shadow-sm',
            )}
        >
            {children}
        </header>
    )
}
