'use client'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import {
    BriefcaseBusiness,
    Headset,
    Home,
    Info,
    ScrollText,
    Users,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { DarkThemeToggle } from './dark-theme-toggle'
import LanguageSelect from './language-select'
import MobileMenuLink from './mobile-menu-link'
import { useNavContext } from './nav-context'
import { usePathname, useRouter } from '@/i18n/routing'

function MobileMenu() {
    const { isOpen, setIsOpen } = useNavContext()
    const router = useRouter()
    const pathname = usePathname()

    const t = useTranslations('links')

    function onLinkClicked(href: string) {
        router.push(href)
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
                        currentPath={pathname}
                        onClick={onLinkClicked}
                        icon={<Home />}
                        href={'/'}
                    >
                        {t('home')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={pathname}
                        onClick={onLinkClicked}
                        icon={<Info />}
                        href={'/about-us'}
                    >
                        {t('aboutUs')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={pathname}
                        onClick={onLinkClicked}
                        icon={<BriefcaseBusiness />}
                        href={'/practice-areas'}
                    >
                        {t('practiceAreas')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={pathname}
                        onClick={onLinkClicked}
                        icon={<Users />}
                        href={'/our-team'}
                    >
                        {t('ourTeam')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={pathname}
                        onClick={onLinkClicked}
                        icon={<ScrollText />}
                        href={'/blogs'}
                    >
                        {t('blogs')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        currentPath={pathname}
                        onClick={onLinkClicked}
                        icon={<Headset />}
                        href={'/contact-us'}
                    >
                        {t('contactUs')}
                    </MobileMenuLink>
                </div>
                <div className="mt-4 flex gap-4 px-4">
                    <DarkThemeToggle className="text-black dark:text-white" />
                    <LanguageSelect />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
