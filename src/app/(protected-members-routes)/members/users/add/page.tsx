import React from 'react'
import AddUserForm from './form'
import { redirect } from 'next/navigation'
import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { UserStatus } from '@/lib/enum'

export default async function AddUserPage() {
    const { session, user } = await getCurrentSession()
    if (session === null || user.status !== UserStatus.ACTIVE) {
        return redirect('/sign-in')
    }

    return (
        <div>
            <AddUserForm />
        </div>
    )
}
