import Image, { ImageProps } from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'
import path from 'path'

type Props = {} & ImageProps

export default async function ImageWithBlur({
    src,
    placeholder = 'blur',
    alt,
    ...props
}: Props) {
    // const imagePath = path.join(process.cwd(), 'public', 'lawyers', 'ratna.png');
    const imageSource = typeof src === 'string' ? src.split('/').splice(1) : ['']

    const imagePath = path.join(process.cwd(), 'public', ...imageSource)

    const imageBuffer = await fs.readFile(imagePath)
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
