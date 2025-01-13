import SearchParamHandler from '@/components/ui/SearchParamHandler'
import { Suspense } from 'react'
import { AuthCard } from '../_components/auth-card'
import { globalGETRateLimit } from '../lib/server/request'
import SignInForm from './form'
import Link from 'next/link'
import AuthPageContainer from '../_components/auth-page-container'
import { redirect } from 'next/navigation'
import { getCurrentSession } from '../lib/server/auth'
import { UserStatus } from '@/lib/enum'
import { createRedirectUrl } from '../lib/server/utils'
import { getUserEmailVerificationRequestCode } from '../lib/server/email-verification'

export default async function SignInPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }

    const { session, user } = await getCurrentSession()
    if (session) {
        if (user.status === UserStatus.NOT_VERIFIED) {
            const emailVerificationCode = await getUserEmailVerificationRequestCode(user.id)
            // if there is email verif code still available, redirect the user
            if (emailVerificationCode) {
                redirect(
                    createRedirectUrl('/verify-emaill', {
                        code: emailVerificationCode,
                        toast: 'Verifying email address',
                    }),
                )
            }
            /**
             * if no, (email verification req has expired), just let them be..
             * the sign-in action will prompt the user after submit to notify the admin
             * to send them a new email for email verification
             */
        } else if (user.status === UserStatus.ON_BOARDING) {
            return redirect(
                createRedirectUrl('/on-boarding', {
                    uid: user.id.toString(),
                    toast: 'Please complete your account',
                }),
            )
        } else if (user.status === UserStatus.ACTIVE) {
            redirect('/members')
        }
    }

    return (
        <AuthPageContainer>
            <Suspense>
                <SearchParamHandler />
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
