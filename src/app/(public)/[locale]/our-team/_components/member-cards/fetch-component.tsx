import { MemberRole } from '@/lib/enum'
import { getData } from './action'
import MemberCards from './member-cards'

type Props = {
    searchParams: Promise<GenericSearchParams<'role', string | undefined>>
}

export default async function FetchComponent({ searchParams }: Props) {
    const data = await getData()
    const { role } = await searchParams

    const roleSearchParam =
        role && Object.values(MemberRole).includes(role as MemberRole) ? (role as MemberRole) : undefined

    return <MemberCards members={data} searchParams={{ currentRole: roleSearchParam }} />
}
