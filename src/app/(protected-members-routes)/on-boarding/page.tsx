import React, { Suspense } from 'react'
import AuthPageContainer from '../_components/auth-page-container'
import SearchParamHandler from '@/components/ui/SearchParamHandler'

export default function Page() {
    return (
        <AuthPageContainer>
            <Suspense>
                <SearchParamHandler />
            </Suspense>
            <div>This is the on-boarding page! Please complete your account</div>
        </AuthPageContainer>
    )
}
