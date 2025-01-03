import React, { Suspense } from 'react'
import AuthPageContainer from '../_components/auth-page-container'
import SearchParamHandler from '@/components/ui/SearchParamHandler'
import { globalGETRateLimit } from '../lib/server/request'
import { getCurrentSession } from '../lib/server/auth'
import { redirect } from 'next/navigation'
import { UserStatus } from '@/lib/enum'
import OnBoardingForm from './form'

export default async function OnBoardingPage() {
    const isAllowed = await globalGETRateLimit()
    if (!isAllowed) {
        return 'Too many requests'
    }

    const { session, user } = await getCurrentSession()
    if (session === null || user.status === UserStatus.NOT_VERIFIED) {
        return redirect('/sign-in')
    } else if (user.status === UserStatus.ACTIVE) {
        return redirect('/members')
    }

    // at this point, the user's status should be 'ON-BOARDING'

    return (
        <AuthPageContainer>
            <Suspense>
                <SearchParamHandler />
            </Suspense>
            <div><OnBoardingForm/></div>
        </AuthPageContainer>
    )
}
