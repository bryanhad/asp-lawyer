import Image, { ImageProps } from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'

type Props = {} & ImageProps

export default async function ImageWithBlur({
    src,
    placeholder = 'blur',
    alt,
    ...props
}: Props) {
    const imageBuffer = await fs.readFile(`./public${src}`)
    const { base64 } = await getPlaiceholder(imageBuffer)

    return (
        <Image
            alt={alt}
            src={src}
            placeholder={placeholder}
            blurDataURL={base64}
            {...props}
        />
    )
}
