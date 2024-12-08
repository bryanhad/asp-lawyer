'use client'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { usePathname, useRouter } from 'next/navigation'
import { DarkThemeToggle } from '../dark-theme-toggle'
import { AVAILABLE_LINKS } from './available-links'
import MobileMenuLink from './mobile-menu-link'
import { useNavContext } from './nav-context'

function MobileMenu() {
    const { isOpen, setIsOpen } = useNavContext()
    const router = useRouter()
    const pathname = usePathname()

    function onLinkClicked(href: string) {
        router.push(href)
        setIsOpen(false)
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* required by radix */}
            <SheetTitle className="hidden">Mobile Navigation Links</SheetTitle>
            <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} className="flex flex-col gap-4 bg-background p-0 pt-20 overflow-hidden">
                <div className={'flex w-full flex-col gap-2'}>
                    {AVAILABLE_LINKS.map((section) => (
                        <section className='[&:not(:first-of-type)]:mt-4' key={section.title}>
                            <h3 className="mb-1 ml-3 text-sm text-muted-foreground">{section.title}</h3>
                            <ul className="">
                                {section.items.map((item) => (
                                    <MobileMenuLink
                                        key={item.href}
                                        currentPathname={pathname}
                                        onClick={onLinkClicked}
                                        icon={item.icon}
                                        href={item.href}
                                    >
                                        {item.title}
                                    </MobileMenuLink>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
                <div className="mt-4 flex gap-4 px-4">
                    <DarkThemeToggle className="text-black dark:text-white" />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
