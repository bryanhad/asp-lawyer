import { Language } from '../../../src/lib/enum'
import { TranslationQuery } from '../../../src/lib/types'

export function getPrivateUrl(publicUploadthingUrl: string) {
    const imageUrlSplit = publicUploadthingUrl.split('/f/')
    imageUrlSplit.splice(1, 0, `a/${process.env.UPLOADTHING_APP_ID}`)
    return imageUrlSplit.join('/')
}

export function getRandomSubsetFromArray<T>(arr: T[]): T[] {
    // Create a shallow copy to avoid modifying the original array
    const shuffled = [...arr]

    // Shuffle the array using Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[i],
        ]
    }

    // Randomly determine how many elements to pick (from 0 to arr.length)
    const randomCount = Math.floor(Math.random() * (arr.length + 1))

    // Return the first `randomCount` items
    return shuffled.slice(0, randomCount)
}

export function getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

export function separateLanguages(
    data: TranslationQuery[],
): Record<Language, string[]> {
    const enArray = data.map((item) => item.en)
    const idArray = data.map((item) => item.id)
    return {
        [Language.EN]: enArray,
        [Language.ID]: idArray,
    }
}
