'use client'

import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'

export default function SectionWithBackground({
    children,
    src,
    alt,
    ...props
}: ImageProps) {
    return (
        <div className="relative grid w-full place-items-center">
            <div className="relative z-[20]">{children}</div>
            <Image
                {...props}
                src={src}
                alt={alt}
                fill
                className={cn(
                    'absolute z-[10] object-cover dark:brightness-75',
                )}
            />
            <div className="absolute inset-0 z-[15] opacity-90 mix-blend-multiply dark:bg-background-suit"></div>
        </div>
    )
}
