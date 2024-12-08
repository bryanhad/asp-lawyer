'use client'

import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

type PageTitleProps = {
    className?: string
}

export default function PageTitle({ className }: PageTitleProps) {
    const pathname = usePathname()

    const pathnameArr = pathname.split('/').slice(1)

    let title: string = ''

    switch (true) {
        case pathnameArr.length === 1:
            title = 'Dashboard'
            break
        case pathnameArr.length === 2:
            title =
                pathnameArr[1] === 'my-settings' ? 'My Settings' : capitalizeFirstLetter(pathnameArr[1].slice(0, -1))
            break
        case pathnameArr.length === 3:
            title =
                pathnameArr[2] === 'add'
                    ? `Add ${pathnameArr[1].slice(0, -1)}`
                    : `View ${capitalizeFirstLetter(pathnameArr[1].slice(0, -1))}`
            break
        default:
            title = `Edit ${pathnameArr[1].slice(0, -1)}`
    }

    if (title.length === 0) {
        return null
    }

    return (
        <h1 className={cn('pb-6 text-2xl font-bold capitalize max-sm:text-center sm:text-3xl md:text-4xl', className)}>
            {title}
        </h1>
    )
}
