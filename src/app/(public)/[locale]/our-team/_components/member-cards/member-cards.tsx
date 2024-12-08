'use client'

import MemberCard from '@/components/ui/member-card'
import { MembersData } from './action'
import { Locale } from '@/i18n/request'
import { useState } from 'react'
import { MemberRole } from '@/lib/enum'
import CardFilter from './card-filter'
import { useLocale } from 'next-intl'

type Props = {
    searchParams: { currentRole?: MemberRole }
    members: MembersData
}

export type FilterOptions = MemberRole | 'ALL'

export default function MemberCards({ members, searchParams: { currentRole } }: Props) {
    const currentLocale = useLocale() as Locale
    const [selectedRole, setSelectedRole] = useState<FilterOptions>(currentRole || 'ALL')

    // Filter members based on the selected role
    const filteredMembers = selectedRole === 'ALL' ? members : members.filter((member) => member.role === selectedRole)

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
            <div className="grid w-full grid-cols-1 gap-5 max-lg:px-12 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 xl:grid-cols-4 xl:gap-14">
                {filteredMembers.map((member) => (
                    <MemberCard key={member.slug} {...member} currentLocale={currentLocale} />
                ))}
            </div>
        </div>
    )
}
