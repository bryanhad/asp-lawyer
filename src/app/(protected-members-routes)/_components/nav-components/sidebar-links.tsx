'use client'

import { usePathname } from 'next/navigation'
import { AVAILABLE_LINKS } from './available-links'
import SidebarLink from './sidebar-link'

type Props = {
    items: (typeof AVAILABLE_LINKS)[number]['items']
}

export default function SidebarLinks({ items }: Props) {
    const pathname = usePathname()
    return (
        <ul className="ml-4 flex flex-col gap-1">
            {items.map((item) => (
                <li key={item.title}>
                    <SidebarLink {...item} currentPathname={pathname} />
                </li>
            ))}
        </ul>
    )
}
