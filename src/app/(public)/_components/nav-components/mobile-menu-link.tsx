'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type MobileMenuLinkProps = {
    children: React.ReactNode
    icon: React.ReactNode
    href: string
    currentPathname: string
    onClick: (href: string) => void
}

function MobileMenuLink({ children, currentPathname, icon, href, onClick }: MobileMenuLinkProps) {
    const pathnameArr = currentPathname.split('/')
    const hrefArr = href.split('/')

    const isActive = currentPathname === href || pathnameArr[1] === hrefArr[1]

    function handleClick() {
        onClick(href)
    }

    return (
        <div className="relative flex flex-col">
            <Button
                role="link"
                variant={'ghost'}
                className={cn('flex items-center justify-start gap-2 rounded-none', {
                    'text-primary hover:text-primary': isActive,
                })}
                onClick={handleClick}
            >
                <>
                    {icon}
                    <div>{children}</div>
                </>
            </Button>
            {isActive && <div className="absolute left-0 z-10 h-full w-2 translate-x-[-50%] rounded-full bg-primary" />}
        </div>
    )
}

export default MobileMenuLink
