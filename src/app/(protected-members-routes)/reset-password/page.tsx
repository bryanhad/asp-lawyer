import QueryParamToast from '@/components/ui/query-param-toast'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { AuthCard } from '../_components/auth-card'
import { validatePasswordResetSessionRequest } from '../lib/server/password-reset'
import { globalGETRateLimit } from '../lib/server/request'
import { PasswordResetForm } from './form'
import AuthPageContainer from '../_components/auth-page-container'

export default async function ResetPasswordPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }
    const { session } = await validatePasswordResetSessionRequest()
    if (session === null) {
        return redirect('/forgot-password')
    }
    if (!session.emailIsVerified) {
        return redirect('/reset-password/verify-email')
    }
    return (
        <AuthPageContainer>
            <Suspense>
                <QueryParamToast param="toast" />
            </Suspense>
            <AuthCard title="Enter your new password" headerLabel={`Remember your password!`}>
                <PasswordResetForm />
            </AuthCard>
        </AuthPageContainer>
    )
}
