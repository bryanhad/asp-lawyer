import QueryParamToast from '@/components/ui/query-param-toast'
// import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
// import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { AuthCard } from '../_components/auth-card'
// import { globalGETRateLimit } from '../lib/server/request'
import SignInForm from './form'
import Link from 'next/link'
import AuthPageContainer from '../_components/auth-page-container'

export default async function SignInPage() {
    // if (!globalGETRateLimit()) {
    //     return 'Too many requests'
    // }

    // const { session, user } = await getCurrentSession()
    // if (session) {
    //     if (!user.emailIsVerified) {
    //         redirect('/verify-email')
    //     }
    //     redirect('/members')
    // }

    return (
        <AuthPageContainer>
            <Suspense>
                <QueryParamToast param="toast" />
            </Suspense>
            <AuthCard title="ASP Members" headerLabel="Insert your credentials to sign-in">
                <SignInForm />
                <div className="mt-4 flex justify-end">
                    <Link
                        className="text-muted-foreground duration-300 hover:text-foreground"
                        href={'/forgot-password'}
                    >
                        Forgot password?
                    </Link>
                </div>
            </AuthCard>
        </AuthPageContainer>
    )
}
