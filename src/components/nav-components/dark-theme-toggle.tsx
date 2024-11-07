'use client'

import { Moon, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useNavContext } from './nav-context'

export function DarkThemeToggle() {
    const { setTheme } = useTheme()
    const { isScrolled } = useNavContext()

    return (
        <Popover>
            <Button asChild variant="ghost" className="bg-transparent">
                <PopoverTrigger
                    className={cn(isScrolled ? 'text-black dark:text-white' : 'text-white')}
                >
                    <SunMedium className="shrink-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="shrink-0 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </PopoverTrigger>
            </Button>

            <PopoverContent className="z-[91] w-auto p-2" align="start">
                <Button
                    variant="naked"
                    size="sm"
                    onClick={() => setTheme('light')}
                >
                    Light
                </Button>
                <Button
                    variant="naked"
                    size="sm"
                    onClick={() => setTheme('dark')}
                >
                    Dark
                </Button>
                <Button
                    variant="naked"
                    size="sm"
                    onClick={() => setTheme('system')}
                >
                    System
                </Button>
            </PopoverContent>
        </Popover>
    )
}
