import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { DarkThemeToggle } from './dark-theme-toggle'
import LanguageSelect from './language-select'
import MobileMenu from './mobile-menu'
import NavHeader from './nav-header'
import NavLinks from './nav-links'

async function Navbar() {
    return (
        <NavHeader>
            <nav className="flex h-full w-full max-w-custom-navbar justify-between px-4 sm:px-6 md:px-8">
                <div className="flex items-end gap-14 self-center">
                    <Link href={'/'} className="flex items-center">
                        <Image
                            src={'/asp-logo-modified.png'}
                            alt="ASP Logo"
                            width={50}
                            height={20}
                            className="w-auto"
                            priority
                        />
                    </Link>
                    <NavLinks />
                </div>
                <div className="hidden gap-5 lg:flex lg:items-center">
                    <LanguageSelect />
                    <DarkThemeToggle />
                </div>
                <MobileMenu />
            </nav>
        </NavHeader>
    )
}

export default Navbar
