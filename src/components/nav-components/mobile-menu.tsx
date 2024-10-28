'use client'

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Locale } from '@/i18n/request'
import {
    BriefcaseBusiness,
    Headset,
    Home,
    Info,
    Menu,
    ScrollText,
    Users,
    X,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import LanguageSelect from './language-select'
import MobileMenuLink from './mobile-menu-link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
    selectedLocale: Locale
}

function MobileMenu({ selectedLocale }: Props) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const [_, currentLocale, ...restOfPath] = usePathname().split('/')
    const currentPath = '/' + restOfPath.join('/')

    const t = useTranslations('navbar')

    function onLinkClicked(href: string) {
        router.push(`/${currentLocale}${href}`)
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* required by radix */}
            <SheetTitle className="hidden">Mobile Navigation Links</SheetTitle>
            <SheetTrigger
                onClick={() => setOpen(!open)}
                className="px-3 lg:hidden"
            >
                {open ? (
                    <X className="shrink-0" />
                ) : (
                    <Menu className="shrink-0" />
                )}
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-8 p-0 pt-20">
                <div className={'flex w-full flex-col gap-2 overflow-hidden'}>
                    <MobileMenuLink
                        currentPath={currentPath}
                        onClick={onLinkClicked}
                        icon={<Home />}
                        href={'/'}
                    >
                        {t('home')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={currentPath}
                        onClick={onLinkClicked}
                        icon={<Info />}
                        href={'/about-us'}
                    >
                        {t('about')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={currentPath}
                        onClick={onLinkClicked}
                        icon={<BriefcaseBusiness />}
                        href={'/practice-areas'}
                    >
                        {t('practiceAreas')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={currentPath}
                        onClick={onLinkClicked}
                        icon={<Users />}
                        href={'/members'}
                    >
                        {t('members')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={currentPath}
                        onClick={onLinkClicked}
                        icon={<ScrollText />}
                        href={'/blogs'}
                    >
                        {t('blogs')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={currentPath}
                        onClick={onLinkClicked}
                        icon={<Headset />}
                        href={'/contact-us'}
                    >
                        {t('contactUs')}
                    </MobileMenuLink>
                </div>
                <div className="px-4">
                    <LanguageSelect selectedLocale={selectedLocale} />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
