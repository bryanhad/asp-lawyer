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
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import LanguageSelect from './language-select'
import MobileMenuLink from './mobile-menu-link'

type Props = {
    selectedLocale: Locale
}

function MobileMenu({ selectedLocale }: Props) {
    const t = useTranslations('navbar')

    return (
        <Sheet>
            {/* required by radix */}
            <SheetTitle className="hidden">Mobile Navigation Links</SheetTitle>
            <SheetTrigger className="px-3 lg:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-8 p-0 pt-12">
                <div className={'flex w-full flex-col gap-2 overflow-hidden'}>
                    <MobileMenuLink icon={<Home />} href={'/'}>
                        {t('home')}
                    </MobileMenuLink>
                    <MobileMenuLink icon={<Info />} href={'/about-us'}>
                        {t('about')}
                    </MobileMenuLink>
                    <MobileMenuLink
                        icon={<BriefcaseBusiness />}
                        href={'/practice-areas'}
                    >
                        {t('practiceAreas')}
                    </MobileMenuLink>
                    <MobileMenuLink icon={<Users />} href={'/members'}>
                        {t('members')}
                    </MobileMenuLink>
                    <MobileMenuLink icon={<ScrollText />} href={'/blogs'}>
                        {t('blogs')}
                    </MobileMenuLink>
                    <MobileMenuLink icon={<Headset />} href={'/contact-us'}>
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
