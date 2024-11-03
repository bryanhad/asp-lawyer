import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'

type Props = { className?: string } & ImageProps

export default function ImageOptimized({
    priority,
    width,
    height,
    alt,
    src,
    className,
    ...props
}: Props) {
    return (
        <Image
            {...props}
            className={cn('h-auto w-full', className)}
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={!!priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    )
}
