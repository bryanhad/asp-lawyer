import LanguageSelect from '@/app/(public)/_components/nav-components/language-select'
import NavbarLinkIcon from './navbar-link-icon'
import HeaderWrapper from './page-header-wrapper'
import { DarkThemeToggle } from '@/app/(public)/_components/nav-components/dark-theme-toggle'

export default function Header() {
    return (
        <HeaderWrapper>
            <div className="flex h-full w-full max-w-custom-navbar items-center justify-between px-4 sm:px-6 md:px-8">
                <NavbarLinkIcon />
                <div className="hidden gap-5 lg:flex lg:items-center">
                    <LanguageSelect />
                    <DarkThemeToggle />
                </div>
            </div>
        </HeaderWrapper>
    )
}