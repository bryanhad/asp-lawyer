import Image, { ImageProps } from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'

type Props = {} & ImageProps

export default async function ImageWithBlur({
    src,
    blurDataURL,
    placeholder = 'blur',
    ...props
}: Props) {
    const imageBuffer = await fs.readFile(`./public${src}`)
    const { base64 } = await getPlaiceholder(imageBuffer)

    return (
        <Image
            src={src}
            placeholder={placeholder}
            blurDataURL={base64}
            {...props}
        />
    )
}
