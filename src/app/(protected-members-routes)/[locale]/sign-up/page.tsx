import { Locale } from '@/i18n/request'
import { redirect } from '@/i18n/routing'
import { getCurrentSession } from '@/lib/auth'
import React from 'react'
import { AuthCard } from '../../_components/auth-card'
import { globalGETRateLimit } from '../../lib/server/request'
import SignUpForm from './_components/form'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: Locale }> }

export default async function SignUpPage({ params }: Props) {
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

    const { session, user } = await getCurrentSession()

    if (session) {
        if (user.emailIsVerified === false) {
            return redirect({ href: '/verify-email', locale: locale })
        }

        return redirect({ href: '/members', locale: locale })
    }

    return (
        <>
            <AuthCard
                title='ASP Members'
                headerLabel="Welcome to ASP Members Sign Up Page"
                backButtonLabel="Sign in"
                backButtonHref="/sign-in"
            >
                <SignUpForm currentLocale={locale} />
            </AuthCard>
        </>
    )
}
