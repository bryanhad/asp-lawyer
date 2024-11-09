'use client'

import { Moon, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useNavContext } from './nav-context'

export function DarkThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const { isScrolled } = useNavContext()

    return (
        <Button
            variant={'ghost'}
            className={cn(
                isScrolled
                    ? 'text-black dark:text-white'
                    : 'text-white hover:text-black dark:hover:text-white',
            )}
            onClick={() => {
                if (resolvedTheme === 'dark') {
                    setTheme('light')
                } else {
                    setTheme('dark')
                }
            }}
        >
            <SunMedium className="shrink-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute shrink-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
