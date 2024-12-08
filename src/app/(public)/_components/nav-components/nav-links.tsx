'use client'

import { useIsScrolled } from '@/hooks/use-is-scrolled'
import { usePathname } from '@/i18n/routing'
import { AVAILABLE_LINKS } from './available-links'
import NavLink from './nav-link'
import { useTranslations } from 'next-intl'

export default function NavLinks() {
    const pathname = usePathname()
    const isScrolled = useIsScrolled()

    const t = useTranslations('links')

    return (
        <div className="hidden gap-10 lg:flex">
            {AVAILABLE_LINKS.map((link) => (
                <NavLink key={link.href} currentPathname={pathname} isScrolled={isScrolled} href={link.href}>
                    {t(link.translationKey)}
                </NavLink>
            ))}
        </div>
    )
}
