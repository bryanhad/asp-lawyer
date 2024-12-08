import { MemberRole } from '@/lib/enum'
import { getData } from './action'
import MemberCards from './member-cards'

type Props = {
    currentRole?: MemberRole
}

export default async function FetchComponent({ currentRole }: Props) {
    const data = await getData()
    return <MemberCards members={data} searchParams={{ currentRole }} />
}
