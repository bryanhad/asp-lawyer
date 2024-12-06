import { getCurrentSession } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function NavbarLinkIcon() {
    const { session } = await getCurrentSession()

    if (!session)
        return (
            <div className="flex items-end">
                <Image src={'/asp-logo-modified.png'} alt="ASP Logo" width={50} height={20} priority />
                <span className="ml-1 text-sm leading-none">Members</span>
            </div>
        )

    return (
        <Link href={'/members'} className="flex items-end">
            <Image src={'/asp-logo-modified.png'} alt="ASP Logo" width={50} height={20} priority />
            <span className="ml-1 text-sm leading-none">Members</span>
        </Link>
    )
}
