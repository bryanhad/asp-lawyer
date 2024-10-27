'use client'

import { PropsWithChildren, ReactNode } from 'react'
import { Link as LickIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {
    title: string | ReactNode
    size?: number
    className?: string
} & PropsWithChildren

function LinkSection({ title, children, size = 18, className }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const titleTag =
        typeof title === 'string'
            ? title.toLowerCase().split(' ').join('-')
            : undefined

    const href = `${pathname}#${titleTag}`

    function handleClick() {
        router.push(href)
    }

    return (
        <span className="group relative cursor-pointer">
            <Link
                href={href}
                className="absolute -left-1 top-1/2 grid size-8 -translate-x-full -translate-y-1/2 place-items-center"
            >
                <LickIcon
                    className={cn(
                        'hidden shrink-0 group-hover:block',
                        className,
                    )}
                    size={size}
                />
            </Link>
            <span onClick={handleClick}>{children}</span>
        </span>
    )
}

export default LinkSection
