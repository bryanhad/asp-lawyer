'use client'

import { useIsScrolled } from '@/hooks/use-is-scrolled'
import { usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { PropsWithChildren, useState } from 'react'
import { NavContext } from './nav-context'

type Props = {} & PropsWithChildren

export default function NavHeader({ children }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const isScrolled = useIsScrolled()
    const isHomePage = usePathname() === '/'

    return (
        <header
            className={cn(
                'fixed top-0 z-[90] flex h-16 w-full justify-center bg-background transition-colors duration-300 lg:h-20',
                {
                    'bg-transparent': !isScrolled && !isOpen,
                    'bg-background/90 backdrop-blur-md':
                        (isScrolled && !isOpen) || !isHomePage,
                },
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
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn('my-auto mr-3 p-3 lg:hidden')}
                >
                    {isOpen ? (
                        <X className={cn('shrink-0')} />
                    ) : (
                        <Menu
                            className={cn('shrink-0 text-white', {
                                'text-black dark:text-white':
                                    isScrolled || !isHomePage,
                            })}
                        />
                    )}
                </div>
            </NavContext.Provider>
        </header>
    )
}
