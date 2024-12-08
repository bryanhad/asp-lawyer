'use client'

import { Button } from '@/components/ui/button'
import Flag from '@/components/ui/flag'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Locale } from '@/i18n/request'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useLocale } from 'next-intl'

export default function LanguageSelect() {
    const router = useRouter()
    const pathname = usePathname()
    const currentLocale = useLocale() as Locale

    function handleLanguageChange(value: string) {
        if (value === currentLocale) {
            return
        }
        router.replace(pathname, { locale: value })
    }

    return (
        <Popover>
            <Button asChild variant="ghost" className="bg-transparent px-2">
                <PopoverTrigger>
                    <Flag flag={currentLocale} />
                    <ChevronDown className="text-muted-foreground" />
                </PopoverTrigger>
            </Button>
            <PopoverContent className="z-[91] w-auto p-2" align="start">
                <div className="flex flex-col gap-2">
                    <Button
                        onClick={() => handleLanguageChange('en')}
                        variant="naked"
                        size="sm"
                        className={cn('flex items-center justify-start gap-2', {
                            'bg-muted': currentLocale === 'en',
                        })}
                    >
                        <Flag flag="en" />
                        <p className="leading-none text-muted-foreground">English</p>
                    </Button>
                    <Button
                        onClick={() => handleLanguageChange('id')}
                        variant="naked"
                        size="sm"
                        className={cn('flex items-center justify-start gap-2', {
                            'bg-muted': currentLocale === 'id',
                        })}
                    >
                        <Flag flag="id" />
                        <p className="leading-none text-muted-foreground">Indonesia</p>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
