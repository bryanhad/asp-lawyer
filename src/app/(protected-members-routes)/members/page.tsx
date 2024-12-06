import { getCurrentSession } from '@/lib/auth'
import React from 'react'
import LogoutButton from '../_components/auth/logout-button'
import { globalGETRateLimit } from '../lib/server/request'
import { redirect } from 'next/navigation'

export default async function MemberPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }

    const { session, user } = await getCurrentSession()
    console.log(user)
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    return (
        <div>
            <h1 className="font-bold">{JSON.stringify(user)}</h1>
            Hello, this is the admin page!
            <LogoutButton />
        </div>
    )
}
