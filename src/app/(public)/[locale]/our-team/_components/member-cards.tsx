'use client'

import MemberCard from '@/components/ui/member-card'
import NotFound from '@/components/ui/not-found'
import { Locale } from '@/i18n/request'
import { MemberRole } from '@/lib/enum'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { getData } from './action'
import CardFilter from './card-filter'
import SearchBar from './search-bar'
import SkeletonFallback from './skeleton'

export type FilterOptions = MemberRole | 'ALL'

export default function MemberCards() {
    const currentLocale = useLocale() as Locale
    const searchParams = useSearchParams()
    const roleSP = searchParams.get('role') as string | null
    const roleSearchParam =
        roleSP && Object.values(MemberRole).includes(roleSP as MemberRole) ? (roleSP as MemberRole) : undefined

    const [selectedRole, setSelectedRole] = useState<FilterOptions>(roleSearchParam || 'ALL')
    const [searchQuery, setSearchQuery] = useState<string>('') // Local state for the search query

    const { data, isPending } = useSuspenseQuery({ queryKey: ['team-members'], queryFn: getData })

    if (isPending) {
        return <SkeletonFallback />
    }

    // Filter members based on the selected role and search query
    const filteredMembers = data.filter(
        (member) =>
            (selectedRole === 'ALL' || member.role === selectedRole) &&
            member.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

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
            <SearchBar onSearch={(query) => setSearchQuery(query)} />
            {filteredMembers.length <= 0 && <NotFound singularEntity='member' searchTerm={searchQuery} />}
            {filteredMembers.length > 0 && (
                <div className="grid w-full flex-[1] grid-cols-1 gap-5 max-lg:px-12 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 xl:grid-cols-4 xl:gap-14">
                    {filteredMembers.map((member) => (
                        <MemberCard key={member.slug} {...member} currentLocale={currentLocale} />
                    ))}
                </div>
            )}
        </>
    )
}
