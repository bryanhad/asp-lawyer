'use client'

import { Button } from '@/components/ui/button'
import { MemberRoles } from '@/lib/enum'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export type Props = {
    searchParams: { currentRole?: string }
}

type FilterValues = MemberRoles | 'ALL'

export default function CardFilter({ searchParams: { currentRole } }: Props) {
    const router = useRouter()

    function handleClick(roleFilterValue: FilterValues) {
        const queryParams = new URLSearchParams(window.location.search)
        if (roleFilterValue === 'ALL') {
            queryParams.delete('role')
        } else {
            queryParams.set('role', roleFilterValue)
        }

        router.push(`${window.location.pathname}?${queryParams.toString()}`)
    }

    return (
        <div className="flex select-none items-center justify-center gap-2">
            {Object.values(MemberRoles).map((role) => (
                <Button
                    key={role}
                    type="button"
                    variant={'outline'}
                    className={cn({
                        'bg-foreground text-background hover:bg-foreground hover:text-background':
                            role === currentRole,
                    })}
                    onClick={() => handleClick(role)}
                >
                    {role}
                </Button>
            ))}
            <Button
                type="button"
                variant={'outline'}
                className={cn({
                    'bg-foreground text-background hover:bg-foreground hover:text-background':
                        currentRole === 'ALL',
                })}
                onClick={() => handleClick('ALL')}
            >
                ALL
            </Button>
        </div>
    )
}