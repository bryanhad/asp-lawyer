import React from 'react'
import HeaderWrapper from './page-header-wrapper'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import LanguageSelect from '@/components/nav-components/language-select'
import { DarkThemeToggle } from '@/components/nav-components/dark-theme-toggle'

export default function Header() {
    return (
        <HeaderWrapper>
            <div className="flex items-center h-full w-full max-w-custom-navbar justify-between px-4 sm:px-6 md:px-8">
                <Link href={'/'} className="flex items-end">
                    <Image
                        src={'/asp-logo-modified.png'}
                        alt="ASP Logo"
                        width={50}
                        height={20}
                        priority
                    />
                    <span className='ml-1 text-sm leading-none'>Members</span>
                </Link>
                <div className="hidden gap-5 lg:flex lg:items-center">
                    <LanguageSelect />
                    <DarkThemeToggle />
                </div>
            </div>
        </HeaderWrapper>
    )
}
