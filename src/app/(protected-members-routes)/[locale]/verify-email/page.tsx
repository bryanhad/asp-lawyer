import Link from 'next/link'

import { redirect } from '@/i18n/routing'
import { Locale } from '@/i18n/request'
import { getCurrentSession } from '@/lib/auth'
import { getUserEmailVerificationRequestFromRequest } from '../../lib/server/email-verification'
import { globalGETRateLimit } from '../../lib/server/request'
import { EmailVerificationForm, ResendEmailVerificationCodeForm } from './components'
import { setRequestLocale } from 'next-intl/server'

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
     * https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const { user } = await getCurrentSession()

    if (user === null) {
        return redirect({ href: '/login', locale: locale })
    }

    // TODO: Ideally we'd sent a new verification email automatically if the previous one is expired,
    // but we can't set cookies inside server components.
    const verificationRequest = await getUserEmailVerificationRequestFromRequest()
    if (verificationRequest === null && user.emailIsVerified) {
        return redirect({ href: '/members', locale: locale })
    }
    return (
        <>
            <h1>Verify your email address</h1>
            <p>We sent an 8-digit code to {verificationRequest?.email ?? user.email}.</p>
            <div className="space-y-2">
                <EmailVerificationForm currentLocale={locale} />
                <ResendEmailVerificationCodeForm />
            </div>
            <Link href="/settings">Change your email</Link>
        </>
    )
}
