'use client'

import { cn } from '@/lib/utils'
import { PropsWithChildren, useEffect, useState } from 'react'
import { NavContext } from './nav-context'
import { Menu, X } from 'lucide-react'
import { usePathname } from '@/i18n/routing'

type Props = {} & PropsWithChildren

export default function NavHeader({ children }: Props) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const isHomePage = usePathname() === '/'

    useEffect(() => {
        const handleScroll = () => {
            // Check if the user has scrolled down 50px or more
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        // Run once initially
        handleScroll()
        window.addEventListener('scroll', handleScroll)

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={cn(
                'fixed top-0 z-[90] flex h-16 w-full justify-center bg-white transition-colors duration-300 lg:h-20',
                {
                    'bg-transparent': !isScrolled && !isOpen,
                    'bg-white/90 backdrop-blur-md': isScrolled && !isOpen
                },
            )}
        >
            <NavContext.Provider
                value={{
                    isScrolled,
                    isOpen,
                    setIsOpen,
                    isHomePage,
                }}
            >
                {children}

                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="my-auto mr-3 p-3 lg:hidden"
                >
                    {isOpen ? (
                        <X
                            className={cn('shrink-0 text-black duration-300', {
                                'text-white': !isScrolled && !isOpen,
                            })}
                        />
                    ) : (
                        <Menu
                            className={cn('shrink-0 text-black duration-300', {
                                'text-white': !isScrolled && !isOpen,
                            })}
                        />
                    )}
                </div>
            </NavContext.Provider>
        </header>
    )
}
