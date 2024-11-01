import { ImageProps } from 'next/image'
import ImageWithBlur from '../ui/image-with-blur'

export function SectionWithBlurBackground({
    children,
    src,
    alt,
}: ImageProps) {
    return (
        <div className="relative grid w-full place-items-center">
            <div className="relative z-[20]">{children}</div>
            <ImageWithBlur
                src={src}
                alt={alt}
                fill
                className="absolute z-[10] object-cover"
            />
        </div>
    )
}
