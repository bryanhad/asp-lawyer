import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'
import LinkButton from '../../_components/link-button'
import DisplayUsers from './_components/display-component'
import { UserStatus } from '@/lib/enum'
import { globalGETRateLimit } from '../../lib/server/request'

export default async function UsersPage() {
    const isAllowed = await globalGETRateLimit()
    if (!isAllowed) {
        return 'Too many requests'
    }

    const { session, user } = await getCurrentSession()
    if (session === null || user.status !== UserStatus.ACTIVE) {
        return redirect('/sign-in')
    }

    return (
        <>
            <div className="flex justify-between gap-4">
                <LinkButton className="mb-4" href={'/members/users/add'}>
                    Add Users
                </LinkButton>
            </div>
            <DisplayUsers />
        </>
    )
}
