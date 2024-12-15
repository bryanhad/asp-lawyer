import { cn } from '@/lib/utils'
import { ImageOff } from 'lucide-react'
import Image, { ImageProps } from 'next/image'

type Props = Omit<ImageProps, 'blurDataURL' | 'placeholder'> & {
    blurDataURL: string | null
    variant: 'naked' | 'absolute-center'
    placeholder: 'blur'
}

export default function ImageWithFallbackPlaceholder({ variant = 'naked', placeholder = 'blur', ...image }: Props) {
    if (!image.blurDataURL) {
        return (
            <div
                className={cn(
                    'flex-col items-center gap-2 text-muted-foreground',
                    {
                        'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2':
                            variant === 'absolute-center',
                    },
                    image.className,
                )}
            >
                <ImageOff className="shrink-0" size={70} />
                <p>Failed to load image</p>
            </div>
        )
    }

    return <Image {...image} alt={image.alt} placeholder={placeholder} blurDataURL={image.blurDataURL} />
}
