import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import LanguageSelect from './language-select'
import { Locale } from '@/i18n/request'
import MobileMenu from './mobile-menu'
import { Separator } from '../ui/separator'
import Search from './search'
import NavLink from './nav-link'

type Props = {
    selectedLocale: Locale
}

async function Navbar({ selectedLocale }: Props) {
    const t = await getTranslations('navbar')

    return (
        <header className="flex h-16 justify-center border-b bg-white lg:h-20">
            <nav className="flex h-full w-full max-w-[1820px] justify-between px-4 sm:px-6 md:px-8">
                <div className="flex items-end gap-14 self-center">
                    <Link href={'/'} className="flex items-center">
                        <h1 className="relative text-xl font-bold text-amber-300 sm:text-2xl">
                            ASP Law firm
                        </h1>
                    </Link>
                    <div className="hidden gap-10 lg:flex">
                        <NavLink href={'/about'}>{t('about')}</NavLink>
                        <NavLink href={'/practice-areas'}>
                            {t('practiceAreas')}
                        </NavLink>
                        <NavLink href={'/members'}>{t('members')}</NavLink>
                        <NavLink href={'/blogs'}>{t('blogs')}</NavLink>
                        <NavLink href={'/contact-us'}>{t('contactUs')}</NavLink>
                    </div>
                </div>
                <div className="hidden gap-5 lg:flex lg:items-center">
                    <LanguageSelect selectedLocale={selectedLocale} />
                    <Separator
                        orientation="vertical"
                        className="h-[70%] self-center"
                    />
                    <Search />
                </div>
                <MobileMenu selectedLocale={selectedLocale} />
            </nav>
        </header>
    )
}

export default Navbar
