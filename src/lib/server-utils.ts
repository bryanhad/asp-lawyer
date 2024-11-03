import { getPlaiceholder } from 'plaiceholder'
import kyInstance from './ky'

export async function getBlurredImageUrl(imageUrl: string) {
    console.log(imageUrl)
    const res = await kyInstance.get(imageUrl)
    const imgBuffer = await res.arrayBuffer()

    const { base64 } = await getPlaiceholder(Buffer.from(imgBuffer))
    return base64
}

export async function getBlurredImageUrls(imageUrls: string[]) {
    // Make all req at once instead of awaiting each one - avoiding waterfall
    const base64Promises = imageUrls.map((url) => getBlurredImageUrl(url))

    // Resolve all req in order
    const base64Results = await Promise.all(base64Promises)

    return base64Results
}
