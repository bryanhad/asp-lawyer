import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'

export default async function MySettingPage() {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    return <div>MySettingPage</div>
}
