'use client'

import { cleanString, cn } from '@/lib/utils'
import { Link as LickIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<
    | {
          title: string
          titleTop?: never
          titleBottom?: never
      }
    | {
          title?: never
          titleTop: string
          titleBottom: string
      }
> & {
    size?: number
    className?: string
}

function LinkSection({
    title,
    children,
    size = 18,
    className,
    titleTop,
    titleBottom,
}: Props) {
    const router = useRouter()
    const pathname = usePathname()

    const titleTag = title
        ? title.toLowerCase().split(' ').join('-')
        : `${cleanString(titleTop!)} ${cleanString(titleBottom!)}`
              .toLowerCase()
              .split(' ')
              .join('-')

    const href = `${pathname}#${titleTag}`

    function handleClick() {
        router.push(href)
    }

    return (
        <span
            onClick={handleClick}
            className={cn('group relative cursor-pointer', className)}
        >
            <Link
                href={href}
                className="absolute -left-1 top-1/2 grid size-8 -translate-x-full -translate-y-1/2 place-items-center"
            >
                <LickIcon
                    className="hidden shrink-0 text-primary group-hover:block"
                    size={size}
                />
            </Link>
            {children}
        </span>
    )
}

export default LinkSection
