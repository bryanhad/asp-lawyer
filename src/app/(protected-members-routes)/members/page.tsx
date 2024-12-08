import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import React from 'react'
import { globalGETRateLimit } from '../lib/server/request'
import { redirect } from 'next/navigation'
import { capitalizeFirstLetter } from '@/lib/utils'

export default async function MemberPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }

    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    return (
        <div className="">
            <h2 className="text-center text-xl leading-none sm:text-start">
                Welcome back,{' '}
                <span className="text-nowrap font-semibold text-primary">{capitalizeFirstLetter(user.username)}!</span>
            </h2>
        </div>
    )
}
