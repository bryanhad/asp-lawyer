'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Locale } from '@/i18n/request'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'

type Props = {
    selectedLocale: Locale
}

export default function LanguageSelect({ selectedLocale }: Props) {
    const pathname = usePathname()
    const router = useRouter()

    function handleLanguageChange(value: string) {
        if (value === selectedLocale) {
            return
        }
        const newLocale = value
        const path = pathname.split('/').slice(2).join('/')
        router.push(`/${newLocale}/${path}`, { scroll: false })
    }

    return (
        <Popover>
            <Button asChild variant="ghost" className="px-2 bg-transparent ">
                <PopoverTrigger>
                    {selectedLocale === 'id' ? (
                        <Image
                            src={'/flag-id.svg'}
                            alt="Indonesian flag"
                            width={24}
                            height={18}
                        />
                    ) : (
                        <Image
                            src={'/flag-en.svg'}
                            alt="English flag"
                            width={24}
                            height={18}
                        />
                    )}
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
                            'bg-muted': selectedLocale === 'en',
                        })}
                    >
                        <Image
                            src={'/flag-en.svg'}
                            alt="English flag"
                            width={24}
                            height={18}
                        />
                        <p className="leading-none text-muted-foreground">
                            English
                        </p>
                    </Button>
                    <Button
                        onClick={() => handleLanguageChange('id')}
                        variant="naked"
                        size="sm"
                        className={cn('flex items-center justify-start gap-2', {
                            'bg-muted': selectedLocale === 'id',
                        })}
                    >
                        <Image
                            src={'/flag-id.svg'}
                            alt="Indonesian flag"
                            width={24}
                            height={18}
                        />
                        <p className="leading-none text-muted-foreground">
                            Indoneisa
                        </p>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
