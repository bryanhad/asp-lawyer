import { AuthCard } from '../_components/auth-card'
import AuthPageContainer from '../_components/auth-page-container'
import { globalGETRateLimit } from '../lib/server/request'
import ForgotPasswordForm from './form'

export default function ForgotPasswordPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }

    return (
        <AuthPageContainer>
            <AuthCard title="Forgot your password?" headerLabel="Enter your email so we can help you">
                <ForgotPasswordForm />
            </AuthCard>
        </AuthPageContainer>
    )
}
