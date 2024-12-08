import Link from 'next/link'

import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'
import { AuthCard } from '../_components/auth-card'
import { getUserEmailVerificationRequestFromRequest } from '../lib/server/email-verification'
import { globalGETRateLimit } from '../lib/server/request'
import { VerifyEmailForms } from './components'
import { Suspense } from 'react'
import QueryParamToast from '@/components/ui/query-param-toast'

export default async function Page() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }

    const { user } = await getCurrentSession()

    if (user === null) {
        return redirect('/sign-in')
    }

    // TODO: Ideally we'd sent a new verification email automatically if the previous one is expired,
    // but we can't set cookies inside server components.
    const verificationRequest = await getUserEmailVerificationRequestFromRequest()
    if (verificationRequest === null && user.emailIsVerified) {
        return redirect('/members')
    }
    return (
        <main className="flex flex-[1] flex-col items-center justify-center px-4">
            <Suspense>
                <QueryParamToast param="toast" />
            </Suspense>
            <AuthCard
                title="Verify Your Email Address"
                headerLabel={`We have sent an 8-digit code to ${verificationRequest?.email ?? user.email}`}
            >
                <VerifyEmailForms />
            </AuthCard>
            <Link href="/settings">Change your email</Link>
        </main>
    )
}
