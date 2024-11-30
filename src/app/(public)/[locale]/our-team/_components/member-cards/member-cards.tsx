'use client'

import MemberCard from '@/components/ui/member-card'
import { MembersData } from './action'
import { Locale } from '@/i18n/request'
import { useState } from 'react'
import { MemberRoles } from '@/lib/enum'
import CardFilter from './card-filter'
import { useLocale } from 'next-intl'

type Props = {
    searchParams: { currentRole?: MemberRoles }
    members: MembersData
}

export type FilterOptions = MemberRoles | 'ALL'

export default function MemberCards({
    members,
    searchParams: { currentRole },
}: Props) {
    const currentLocale = useLocale() as Locale
    const [selectedRole, setSelectedRole] = useState<FilterOptions>(
        currentRole || 'ALL',
    )

    // Filter members based on the selected role
    const filteredMembers =
        selectedRole === 'ALL'
            ? members
            : members.filter((member) => member.role === selectedRole)

    return (
        <div>
            <CardFilter
                onClick={(r) => {
                    if (r === selectedRole) {
                        return
                    }
                    setSelectedRole(r)
                }}
                currentSelectedRole={selectedRole}
            />
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-12">
                {filteredMembers.map((member) => (
                    <MemberCard
                        key={member.slug}
                        {...member}
                        currentLocale={currentLocale}
                    />
                ))}
            </div>
        </div>
    )
}
