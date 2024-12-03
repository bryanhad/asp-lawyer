'use client'

import { usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type PageTitleProps = {
    className?: string
}

export default function PageTitle({ className }: PageTitleProps) {
    const pathname = usePathname()

    const pathnameArr = pathname.split('/')

    const isAddPage = pathnameArr[3] === 'add'
    const isEditPage = pathnameArr[4] === 'edit'
    const isNotFound = ![
        '/members',
        '/members/users',
        '/members/team-members',
        '/members/blogs',
        '/members/practice-areas',
        '/members/settings',
    ].includes(pathname)

    const singularPageTitle = pathnameArr.length > 2 ? pathnameArr[2].slice(0, -1) : ''

    let title: string

    switch (true) {
        case isAddPage:
            title = `Add ${singularPageTitle}`
            break
        case isEditPage:
            title = `Edit ${singularPageTitle}`
            break
        default:
            title = pathnameArr[1] === 'members' && pathnameArr.length === 2 ? 'Dashboard' : pathnameArr[2]
            break
    }

    if (!isAddPage && !isEditPage && isNotFound) {
        return null
    }

    return (
        <h1 className={cn('text-2xl font-bold capitalize max-sm:text-center sm:text-3xl md:text-4xl pb-6', className)}>
            {title}
        </h1>
    )
}
