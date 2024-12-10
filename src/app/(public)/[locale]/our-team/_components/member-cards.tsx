'use client'

import MemberCard from '@/components/ui/member-card'
import { Locale } from '@/i18n/request'
import { MemberRole } from '@/lib/enum'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { getData } from './action'
import CardFilter from './card-filter'
import SkeletonFallback from './skeleton'

export type FilterOptions = MemberRole | 'ALL'

export default function MemberCards() {
    const currentLocale = useLocale() as Locale
    const searchParams = useSearchParams()
    const roleSP = searchParams.get('role') as string | null
    const roleSearchParam =
        roleSP && Object.values(MemberRole).includes(roleSP as MemberRole) ? (roleSP as MemberRole) : undefined

    const [selectedRole, setSelectedRole] = useState<FilterOptions>(roleSearchParam || 'ALL')
    const { data, isPending } = useSuspenseQuery({ queryKey: ['team-members'], queryFn: getData })

    if (isPending) {
        return <SkeletonFallback />
    }

    // Filter members based on the selected role
    const filteredMembers = selectedRole === 'ALL' ? data : data.filter((member) => member.role === selectedRole)

    return (
        <>
            <CardFilter
                onClick={(r) => {
                    if (r === selectedRole) {
                        return
                    }
                    setSelectedRole(r)
                }}
                currentSelectedRole={selectedRole}
            />
            <div className="grid w-full grid-cols-1 gap-5 max-lg:px-12 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 xl:grid-cols-4 xl:gap-14">
                {filteredMembers.map((member) => (
                    <MemberCard key={member.slug} {...member} currentLocale={currentLocale} />
                ))}
            </div>
        </>
    )
}
