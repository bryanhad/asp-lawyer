import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { globalGETRateLimit } from '@/app/(protected-members-routes)/lib/server/request'
import { UserRole, UserStatus } from '@/lib/enum'
import { redirect } from 'next/navigation'
import AddUserForm from './form'

export default async function AddUserPage() {
    const isAllowed = await globalGETRateLimit()
    if (!isAllowed) {
        return 'Too many requests'
    }

    const { session, user } = await getCurrentSession()
    if (session === null || user.status !== UserStatus.ACTIVE) {
        return redirect('/sign-in')
    } else if (user.role !== UserRole.ADMIN) {
        return redirect('/members')
    }

    return (
        <div>
            <AddUserForm />
        </div>
    )
}
