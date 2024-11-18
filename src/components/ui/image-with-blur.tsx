import Image, { ImageProps } from 'next/image'
import { getBlurredImageUrl } from '@/lib/server-utils'

type Props = ImageProps & { src: string }

export default async function ImageWithBlur({
    src,
    placeholder = 'blur',
    alt,
    height,
    width,
    ...props
}: Props) {
    const blurImage = await getBlurredImageUrl(src)

    return (
        <Image
            alt={alt}
            src={src}
            height={height}
            width={width}
            placeholder={placeholder}
            blurDataURL={blurImage}
            {...props}
        />
    )
}
