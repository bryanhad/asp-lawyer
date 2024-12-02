import React from 'react'
import { AuthCard } from '../../_components/auth-card'
import SignInForm from './_components/form'
import { setRequestLocale } from 'next-intl/server'
import { Locale } from '@/i18n/request'
import { globalGETRateLimit } from '../../lib/server/request'
import { getCurrentSession } from '@/lib/auth'
import { redirect } from '@/i18n/routing'

type Props = { params: Promise<{ locale: Locale }> }

export default async function SignInPage({ params }: Props) {
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
        if (!user.emailIsVerified) {
            return redirect({ href: '/verify-email', locale })
        }
        return redirect({ href: '/', locale })
    }

    return (
        <AuthCard headerLabel="Welcome to ASP Members Sign-in Page">
            <SignInForm />
        </AuthCard>
    )
}
