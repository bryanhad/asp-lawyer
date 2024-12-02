'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Locale } from '@/i18n/request'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { memo } from 'react'
import flagEN from '/public/flag-en.svg'
import flagID from '/public/flag-id.svg'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'

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
                    <Image
                        src={currentLocale === 'en' ? flagEN : flagID}
                        alt={
                            currentLocale === 'en'
                                ? 'English Flag'
                                : 'Indonesian Flag'
                        }
                        width={24}
                        height={18}
                        priority
                    />
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
                        <FlagImage src={flagEN} alt="English flag" />
                        <p className="leading-none text-muted-foreground">
                            English
                        </p>
                    </Button>
                    <Button
                        onClick={() => handleLanguageChange('id')}
                        variant="naked"
                        size="sm"
                        className={cn('flex items-center justify-start gap-2', {
                            'bg-muted': currentLocale === 'id',
                        })}
                    >
                        <FlagImage src={flagID} alt="Indonesian flag" />
                        <p className="leading-none text-muted-foreground">
                            Indonesia
                        </p>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

const FlagImage = memo(function FlagImage({
    src,
    alt,
}: {
    src: string
    alt: string
}) {
    return <Image src={src} alt={alt} width={24} height={18} priority />
})
