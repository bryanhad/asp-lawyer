import { redirect } from 'next/navigation'
import { getCurrentSession } from '../lib/server/auth'
import { globalGETRateLimit } from '../lib/server/request'
import { UserStatus } from '@/lib/enum'
import { createRedirectUrl } from '../lib/server/utils'
import UserFeedbackComponent from './user-feedback-component'
import AuthPageContainer from '../_components/auth-page-container'
import SearchParamHandler from '@/components/ui/SearchParamHandler'
import { Suspense } from 'react'

export default async function VerifyEmailPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }

    const { session, user } = await getCurrentSession()
    if (session) {
        switch (user.status) {
            case UserStatus.ACTIVE:
                // TODO: should be allowed, beacuse this should be running 'change email' action
                return redirect('/members')
            case UserStatus.ON_BOARDING:
                return redirect(
                    createRedirectUrl('/on-boarding', {
                        uid: user.id.toString(),
                        toast: 'Please complete your account',
                    }),
                )
            default:
                return redirect('/sign-in')
        }
    }

    /**
     * I think it's fine to handle the email verification code
     * on client side.. it gives more feedback to the user (in my opninion hehe)
     */
    return (
        <AuthPageContainer>
            <Suspense>
                <SearchParamHandler />
            </Suspense>
            <UserFeedbackComponent />
        </AuthPageContainer>
    )
}
