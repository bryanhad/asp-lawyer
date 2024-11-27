'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from '@/i18n/routing'
import { MemberRoles } from '@/lib/enum'
import { cn } from '@/lib/utils'
import { FilterOptions } from './member-cards'

export type Props = {
    currentSelectedRole: FilterOptions
    onClick: (clickedFilter: FilterOptions) => void
}

export default function CardFilter({
    currentSelectedRole,
    onClick,
}: Props) {
    const pathname = usePathname()
    const router = useRouter()

    function handleClick(value: FilterOptions) {
        const queryParams = new URLSearchParams(window.location.search)
        if (value === 'ALL') {
            queryParams.delete('role')
        } else {
            queryParams.set('role', value)
        }

        router.push(`${pathname}?${queryParams.toString()}`)
        onClick(value)
    }

    return (
        <div className="flex select-none flex-wrap items-center justify-center gap-2">
            <Button
                type="button"
                variant={'outline'}
                className={cn({
                    'bg-foreground text-background hover:bg-foreground hover:text-background':
                        currentSelectedRole === 'ALL',
                })}
                onClick={() => handleClick('ALL')}
            >
                ALL
            </Button>
            {Object.values(MemberRoles).map((role) => (
                <Button
                    key={role}
                    type="button"
                    variant={'outline'}
                    className={cn({
                        'bg-foreground text-background hover:bg-foreground hover:text-background':
                            role === currentSelectedRole,
                    })}
                    onClick={() => handleClick(role)}
                >
                    {role}
                </Button>
            ))}
        </div>
    )
}
