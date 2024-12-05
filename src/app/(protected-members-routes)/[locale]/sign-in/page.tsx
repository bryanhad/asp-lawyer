import QueryParamToast from '@/components/ui/query-param-toast'
import { Locale } from '@/i18n/request'
import { redirect } from '@/i18n/routing'
import { getCurrentSession } from '@/lib/auth'
import { setRequestLocale } from 'next-intl/server'
import { AuthCard } from '../../_components/auth-card'
import { globalGETRateLimit } from '../../lib/server/request'
import SignInForm from './_components/form'
import { Suspense } from 'react'

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
     * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const { session, user } = await getCurrentSession()
    if (session) {
        if (!user.emailIsVerified) {
            redirect({ href: '/verify-email', locale })
        }
        redirect({ href: '/members', locale })
    }

    return (
        <main className="flex flex-[1] items-center justify-center px-4">
            <Suspense>
                <QueryParamToast param="toast" />
            </Suspense>
            <AuthCard title="ASP Members" headerLabel="Insert your credentials to sign-in">
                <SignInForm />
            </AuthCard>
        </main>
    )
}
