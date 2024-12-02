import { getPlaiceholder } from 'plaiceholder'
import kyInstance from './ky'
import { TranslationQuery } from './types'
import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/request'
import { cache } from 'react'
import { getLocale } from 'next-intl/server'

export function getPrivateUrl(publicUploadthingUrl: string) {
    const imageUrlSplit = publicUploadthingUrl.split('/f/')
    imageUrlSplit.splice(1, 0, `a/${process.env.UPLOADTHING_APP_ID}`)
    return imageUrlSplit.join('/')
}

export async function getBlurredImageUrl(imageUrl: string) {
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

export function parseStringifiedArray<T = string>(stringifiedArr: string): T[] {
    try {
        return JSON.parse(stringifiedArr) as T[]
    } catch (error) {
        console.error('Failed to parse stringified array:', error)
        return []
    }
}

export function parse_StringifiedArray_TranslationQuery({
    en: stringifiedArrOfEnglishTranslations,
    id: stringifiedArrOfIndonesianTranslations,
}: TranslationQuery): { id: string[]; en: string[] } {
    return {
        en: parseStringifiedArray(stringifiedArrOfEnglishTranslations),
        id: parseStringifiedArray(stringifiedArrOfIndonesianTranslations),
    }
}

export function verifyLocale(locale: string | undefined): Locale | null {
    if (routing.locales.includes(locale as Locale)) {
        return locale as Locale
    }
    return null
}

export const getCurrentLocale = cache(async () => {
    return (await getLocale()) as Locale
})
