'use client'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Locale } from '@/i18n/request'
import {
    BriefcaseBusiness,
    Headset,
    Home,
    Info,
    ScrollText,
    Users,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { DarkThemeToggle } from './dark-theme-toggle'
import LanguageSelect from './language-select'
import MobileMenuLink from './mobile-menu-link'
import { useNavContext } from './nav-context'

type Props = {
    selectedLocale: Locale
}

function MobileMenu({ selectedLocale }: Props) {
    const { isOpen, setIsOpen } = useNavContext()
    const router = useRouter()

    const [_, currentLocale, ...restOfPath] = usePathname().split('/')
    const currentPath = '/' + restOfPath.join('/')

    const t = useTranslations('links')

    function onLinkClicked(href: string) {
        router.push(`/${currentLocale}${href}`)
        setIsOpen(false)
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* required by radix */}
            <SheetTitle className="hidden">Mobile Navigation Links</SheetTitle>
            <SheetContent
                autoFocus={false}
                className="flex flex-col gap-4 bg-background p-0 pt-20"
            >
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
                        {t('aboutUs')}
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
                        href={'/our-team'}
                    >
                        {t('ourTeam')}
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
                <div className="flex gap-4 px-4 mt-4">
                    <DarkThemeToggle className="text-black dark:text-white" />
                    <LanguageSelect selectedLocale={selectedLocale} />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
