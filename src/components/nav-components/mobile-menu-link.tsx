import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

type MobileMenuLinkProps = {
    children: React.ReactNode
    icon: React.ReactNode
    href: string
    currentPath: string
    onClick: (href: string) => void
}

function MobileMenuLink({
    children,
    currentPath,
    icon,
    href,
    onClick,
}: MobileMenuLinkProps) {
    const isActive = currentPath === href

    function handleClick() {
        onClick(href)
    }

    return (
        <div className="relative flex flex-col">
            <Button
                variant={'ghost'}
                className={cn(
                    'flex items-center justify-start gap-2 rounded-none',
                    {
                        'text-primary hover:text-primary': isActive,
                    },
                )}
                onClick={handleClick}
            >
                <>
                    {icon}
                    <div>{children}</div>
                </>
            </Button>
            {isActive && (
                <div className="absolute left-0 z-10 h-full w-2 translate-x-[-50%] rounded-full bg-primary" />
            )}
        </div>
    )
}

export default MobileMenuLink
