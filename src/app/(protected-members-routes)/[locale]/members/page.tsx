import { Locale } from '@/i18n/request'
import { getCurrentSession } from '@/lib/auth'
import { setRequestLocale } from 'next-intl/server'
import React from 'react'
import LogoutButton from '../../_components/auth/logout-button'
import { globalGETRateLimit } from '../../lib/server/request'
import { redirect } from '@/i18n/routing'

type Props = { params: Promise<{ locale: Locale }> }

export default async function MemberPage({ params }: Props) {
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
    if (session === null) {
        return redirect({ href: '/sign-in', locale })
    }
    if (!user.emailIsVerified) {
        return redirect({ href: '/verify-email', locale })
    }

    return (
        <div>
            <h1 className="font-bold">{JSON.stringify(user)}</h1>
            Hello, this is the admin page!
            <LogoutButton />
            <p>aheeaheah</p>
            <p>aheeaheah</p>
        </div>
    )
}
