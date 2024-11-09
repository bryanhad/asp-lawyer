'use client'

import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

export default function SectionWithBackground({
    children,
    src,
    alt,
    overlayClassName,
    darkThemeSrc,
    ...props
}: ImageProps & { overlayClassName?: string; darkThemeSrc?: string }) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Ensure that the component is only rendered after the client is fully mounted
    useEffect(() => {
        setMounted(true)
    }, [])

    const imageSrc =
        resolvedTheme === 'dark' && darkThemeSrc ? darkThemeSrc : src

    return (
        <div className="relative grid w-full place-items-center">
            {overlayClassName && (
                <div
                    className={cn(
                        'absolute inset-0 z-20 opacity-50',
                        overlayClassName,
                    )}
                ></div>
            )}
            <div className="relative z-[20]">{children}</div>
            {mounted && (
                <Image
                    {...props}
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="absolute z-[10] object-cover"
                />
            )}
        </div>
    )
}
