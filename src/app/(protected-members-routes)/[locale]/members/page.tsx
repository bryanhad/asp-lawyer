import { getCurrentSession } from '@/lib/auth'
import React from 'react'

export default async function MemberPage() {
    const { user } = await getCurrentSession()

    return (
        <div>
            <h1 className="font-bold">{JSON.stringify(user)}</h1>
            Hello, this is the admin page!
            <p>aheeaheah</p>
            <p>aheeaheah</p>
        </div>
    )
}
