'use client'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { usePathname, useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { AVAILABLE_LINKS } from './available-links'
import { DarkThemeToggle } from './dark-theme-toggle'
import LanguageSelect from './language-select'
import MobileMenuLink from './mobile-menu-link'
import { useNavContext } from './nav-context'

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
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="flex flex-col gap-4 bg-background p-0 pt-20"
            >
                <nav className={'flex w-full flex-col gap-2 overflow-hidden'}>
                    {AVAILABLE_LINKS.map((link) => (
                        <MobileMenuLink
                            key={link.href}
                            currentPathname={pathname}
                            onClick={onLinkClicked}
                            icon={link.icon}
                            href={link.href}
                        >
                            {t(link.translationKey)}
                        </MobileMenuLink>
                    ))}
                </nav>
                <div className="mt-4 flex gap-4 px-4">
                    <DarkThemeToggle className="text-black dark:text-white" />
                    <LanguageSelect />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
