import React from 'react'
import AddBlogForm from './form'
import { getCurrentSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AddBlogPage() {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    return <AddBlogForm />
}
