import { validatePasswordResetSessionRequest } from '@/app/(protected-members-routes)/lib/server/password-reset'
import { globalGETRateLimit } from '@/app/(protected-members-routes)/lib/server/request'
import { redirect } from 'next/navigation'
import { AuthCard } from '../../_components/auth-card'
import { PasswordResetEmailVerificationForm } from './form'
import AuthPageContainer from '../../_components/auth-page-container'

export default async function VerifyEmailToResetPasswordPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }
    const { session } = await validatePasswordResetSessionRequest()
    if (session === null) {
        return redirect('/forgot-password')
    }
    if (session.emailIsVerified) {
        return redirect('/reset-password')
    }
    return (
        <AuthPageContainer>
            <AuthCard title="Verify your email" headerLabel={`We have sent an 8-digit code to ${session.email}`}>
                <PasswordResetEmailVerificationForm />
            </AuthCard>
        </AuthPageContainer>
    )
}
