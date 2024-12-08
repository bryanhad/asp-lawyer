import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { DarkThemeToggle } from '../dark-theme-toggle'
import NavbarLinkIcon from '../navbar-link-icon'
import HeaderWrapper from './header-wrapper'
import SignOutButton from '../auth/sign-out-button'
import MobileMenu from './mobile-menu'

export default async function Header() {
    const { session } = await getCurrentSession()

    return (
        <HeaderWrapper>
            <div className="flex h-full w-full max-w-custom-navbar items-center justify-between px-4 sm:px-6 md:px-8">
                <NavbarLinkIcon />
                <div className="hidden gap-5 lg:flex lg:items-center">
                    {session && <SignOutButton />}
                    {/* <LanguageSelect /> */}
                    <DarkThemeToggle />
                </div>
            </div>
            <MobileMenu />
        </HeaderWrapper>
    )
}
