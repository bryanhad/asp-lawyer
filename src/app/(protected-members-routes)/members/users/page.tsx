import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { Smile } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function BlogsPage() {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    return (
        <>
            <div className="flex items-end gap-2">
                <Smile className="shrink-0" size={30} />
                <h2>Nanti ya.. belum jadii...</h2>
            </div>
        </>
    )
}
