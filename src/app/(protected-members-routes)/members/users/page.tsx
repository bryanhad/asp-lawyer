import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'
import LinkButton from '../../_components/link-button'
import DisplayUsers from './_components/display-component'

export default async function UsersPage() {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
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
