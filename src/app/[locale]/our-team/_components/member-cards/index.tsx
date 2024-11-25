'use client'

import MemberCard from '@/components/ui/member-card'
import { Locale } from '@/i18n/request'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { getData } from './action'
import { Props as CardFilterProps } from './card-filter'

type Props = {
    currentLocale: Locale
} & CardFilterProps

export default function MemberCards({
    currentLocale,
    searchParams: { currentRole },
}: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['members'],
        queryFn: getData,
    })

    if (isLoading) {
        return <Loader2 className="shrink-0 animate-spin" />
    }

    if (isError) {
        return (
            <p className="text-destructive">
                Failed to load members. Please try again later.
            </p>
        )
    }

    if (!data) {
        return <p className="text-destructive">No members data available.</p>
    }

    // Filter members based on role
    const filteredMembers = currentRole
        ? data.filter((member) => member.role === currentRole)
        : data

    return (
        <div className="grid w-full grid-cols-4 gap-5">
            {filteredMembers.map((member) => (
                <MemberCard
                    key={member.slug}
                    {...member}
                    currentLocale={currentLocale}
                />
            ))}
        </div>
    )
}
