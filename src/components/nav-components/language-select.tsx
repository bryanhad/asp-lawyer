'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'
import { Locale } from '@/i18n/request'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

type Props = {
    selectedLocale: Locale
}

export default function LanguageSelect({ selectedLocale }: Props) {
    const pathname = usePathname()
    const router = useRouter()

    function handleLanguageChange(value: string) {
        const newLocale = value
        const path = pathname.split('/').slice(2).join('/')
        router.push(`/${newLocale}/${path}`)
    }

    return (
        <Select onValueChange={handleLanguageChange}>
            <SelectTrigger className="focus:ring-0 w-max">
                <div className="pr-1">
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
                </div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en" noCheck>
                    <div className="flex gap-2 items-center">
                        <Image
                            src={'/flag-en.svg'}
                            alt="English flag"
                            width={24}
                            height={18}
                        />
                        <p className="leading-none">English</p>
                    </div>
                </SelectItem>
                <SelectItem value="id" noCheck>
                    <div className="flex gap-2 items-center">
                        <Image
                            src={'/flag-id.svg'}
                            alt="Indonesian flag"
                            width={24}
                            height={18}
                        />
                        <p className="leading-none">Indoneisa</p>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    )
}
