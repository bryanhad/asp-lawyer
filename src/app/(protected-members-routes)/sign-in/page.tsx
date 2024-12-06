import QueryParamToast from '@/components/ui/query-param-toast'
import { getCurrentSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { AuthCard } from '../_components/auth-card'
import { globalGETRateLimit } from '../lib/server/request'
import SignInForm from './form'

export default async function SignInPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }

    const { session, user } = await getCurrentSession()
    if (session) {
        if (!user.emailIsVerified) {
            redirect('/verify-email')
        }
        redirect('/members')
    }

    return (
        <main className="flex flex-[1] items-center justify-center px-4">
            <Suspense>
                <QueryParamToast param="toast" />
            </Suspense>
            <AuthCard title="ASP Members" headerLabel="Insert your credentials to sign-in">
                <SignInForm />
            </AuthCard>
        </main>
    )
}
