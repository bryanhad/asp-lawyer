import Link from 'next/link'

import { Locale } from '@/i18n/request'
import { redirect } from '@/i18n/routing'
import { getCurrentSession } from '@/lib/auth'
import { setRequestLocale } from 'next-intl/server'
import { AuthCard } from '../../_components/auth-card'
import { getUserEmailVerificationRequestFromRequest } from '../../lib/server/email-verification'
import { globalGETRateLimit } from '../../lib/server/request'
import { VerifyEmailForms } from './components'

type Props = { params: Promise<{ locale: Locale }> }

export default async function Page({ params }: Props) {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }

    const { locale } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const { user } = await getCurrentSession()

    if (user === null) {
        return redirect({ href: '/sign-in', locale: locale })
    }

    // TODO: Ideally we'd sent a new verification email automatically if the previous one is expired,
    // but we can't set cookies inside server components.
    const verificationRequest = await getUserEmailVerificationRequestFromRequest()
    if (verificationRequest === null && user.emailIsVerified) {
        return redirect({ href: '/members', locale: locale })
    }
    return (
        <main className="flex flex-[1] flex-col items-center justify-center px-4">
            <AuthCard
                title="Verify Your Email Address"
                headerLabel={`We have sent an 8-digit code to ${verificationRequest?.email ?? user.email}`}
            >
                <VerifyEmailForms />
            </AuthCard>
            <Link href="/settings">Change your email</Link>
        </main>
    )
}
