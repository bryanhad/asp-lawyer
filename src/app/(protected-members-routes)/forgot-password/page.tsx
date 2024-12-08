import Link from 'next/link'
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
                <div className="mt-4 flex justify-end">
                    <Link
                        className="text-muted-foreground duration-300 hover:text-foreground"
                        href={'/sign-in'}
                    >
                        Go back to sign in
                    </Link>
                </div>
            </AuthCard>
        </AuthPageContainer>
    )
}
