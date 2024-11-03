import Image, { ImageProps } from 'next/image'

export function SectionWithBlurBackground({
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
                className="absolute z-[10] object-cover"
            />
        </div>
    )
}
