import { Locale } from '@/i18n/request'
import { redirect } from '@/i18n/routing'
import { getCurrentSession } from '@/lib/auth'
import React from 'react'
import { AuthCard } from '../_components/auth-card'
import { globalGETRateLimit } from '../../lib/server/request'

type Props = { params: Promise<{ currentLocale: Locale }> }

export default async function SignUpPage({ params }: Props) {
    if (!globalGETRateLimit()) {
		return "Too many requests";
	}

    const { currentLocale } = await params
    const { session, user } = await getCurrentSession()

    if (session) {
        if (user.emailIsVerified === false) {
            return redirect({ href: '/verify-email', locale: currentLocale })
        }
        if (user.registered2FA === false) {
            return redirect({ href: '/2fa/setup', locale: currentLocale })
        }
        if (session.twoFactorIsVerified === false) {
            return redirect({ href: '/2fa', locale: currentLocale })
        }
        return redirect({ href: '/', locale: currentLocale })
    }

    return(
        <AuthCard headerLabel="Welcome to ASP Members Login Page">
        <SignInForm />
    </AuthCard>
    )
}
