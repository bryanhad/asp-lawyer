import { Link } from '@/i18n/routing'
import Image from 'next/image'
import React from 'react'

export default function NavbarLinkIcon() {
    return (
        <Link href={'/members'} className="flex items-end">
            <Image src={'/asp-logo-modified.png'} alt="ASP Logo" width={50} height={20} priority />
            <span className="ml-1 text-sm leading-none">Members</span>
        </Link>
    )
}
