import { Locale } from '@/i18n/request'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import LanguageSelect from './language-select'
import MobileMenu from './mobile-menu'
import NavHeader from './nav-header'
import NavLink from './nav-link'
import Image from 'next/image'
import { DarkThemeToggle } from './dark-theme-toggle'

type Props = {
    selectedLocale: Locale
}

async function Navbar({ selectedLocale }: Props) {
    const t = await getTranslations('navbar')

    return (
        <NavHeader>
            <nav className="flex h-full w-full max-w-[1720px] justify-between px-4 sm:px-6 md:px-8">
                <div className="flex items-end gap-14 self-center">
                    <Link href={'/'} className="flex items-center">
                        <h1 className="relative text-xl font-bold text-primary sm:text-2xl">
                            <Image
                                src={'/asp-logo-modified.png'}
                                alt="ASP Logo"
                                width={50}
                                height={20}
                                priority
                            />
                        </h1>
                    </Link>
                    <div className="hidden gap-10 lg:flex">
                        <NavLink href={'/about-us'}>{t('about')}</NavLink>
                        <NavLink href={'/practice-areas'}>
                            {t('practiceAreas')}
                        </NavLink>
                        <NavLink href={'/lawyers'}>{t('lawyers')}</NavLink>
                        <NavLink href={'/blogs'}>{t('blogs')}</NavLink>
                        <NavLink href={'/contact-us'}>{t('contactUs')}</NavLink>
                    </div>
                </div>
                <div className="hidden gap-5 lg:flex lg:items-center">
                    <LanguageSelect selectedLocale={selectedLocale} />
                    <DarkThemeToggle />
                    {/* <Separator
                        orientation="vertical"
                        className="h-[70%] self-center"
                    /> */}
                    {/* <Search /> */}
                </div>
                <MobileMenu selectedLocale={selectedLocale} />
            </nav>
        </NavHeader>
    )
}

export default Navbar
