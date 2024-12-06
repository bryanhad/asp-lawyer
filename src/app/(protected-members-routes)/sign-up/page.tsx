import { getCurrentSession } from '@/lib/auth'
import React from 'react'
import { AuthCard } from '../_components/auth-card'
import { globalGETRateLimit } from '../lib/server/request'
import { redirect } from 'next/navigation'
import SignUpForm from './form'

export default async function SignUpPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }

    const { session, user } = await getCurrentSession()

    if (session) {
        if (user.emailIsVerified === false) {
            return redirect('/verify-email')
        }

        return redirect('/members')
    }

    return (
        <main className="flex flex-[1] items-center justify-center px-4">
            <AuthCard
                title="ASP Members"
                headerLabel="Welcome to ASP Members Sign Up Page"
                backButtonLabel="Sign in"
                backButtonHref="/sign-in"
            >
                <SignUpForm />
            </AuthCard>
        </main>
    )
}
