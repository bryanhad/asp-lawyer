'use client'

import {
    Sheet,
    SheetContent,
    SheetTitle
} from '@/components/ui/sheet'
import { Locale } from '@/i18n/request'
import {
    BriefcaseBusiness,
    Headset,
    Home,
    Info,
    ScrollText,
    Users
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
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

    const t = useTranslations('navbar')

    function onLinkClicked(href: string) {
        router.push(`/${currentLocale}${href}`)
        setIsOpen(false)
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* required by radix */}
            <SheetTitle className="hidden">Mobile Navigation Links</SheetTitle>
            <SheetContent className="flex flex-col gap-8 p-0 pt-20 bg-white">
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
                        href={'/lawyers'}
                    >
                        {t('lawyers')}
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
