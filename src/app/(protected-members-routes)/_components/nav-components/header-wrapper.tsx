'use client'

import { useIsScrolled } from '@/hooks/use-is-scrolled'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { PropsWithChildren, useState } from 'react'
import { NavContext } from './nav-context'

type Props = {} & PropsWithChildren

export default function NavHeader({ children }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const isScrolled = useIsScrolled()

    return (
        <header
            className={cn(
                'fixed top-0 z-[90] flex h-16 w-full justify-center bg-background transition-colors duration-300',
                isScrolled && 'border-b border-b-border shadow-sm',
            )}
        >
            <NavContext.Provider
                value={{
                    isOpen,
                    setIsOpen,
                }}
            >
                {children}
                {/* mobile nav menu toggler */}
                <div onClick={() => setIsOpen(!isOpen)} className={cn('my-auto mr-3 p-3 lg:hidden')}>
                    {isOpen ? <X className={cn('shrink-0')} /> : <Menu className={cn('shrink-0')} />}
                </div>
            </NavContext.Provider>
        </header>
    )
}
