import { getPlaiceholder } from 'plaiceholder'
import kyInstance from './ky'
import { TranslationQuery } from './types'
import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/request'
import { cache } from 'react'
import { getLocale } from 'next-intl/server'
import { SafeParseError, z, ZodSchema } from 'zod'
import { logger } from './logger'

export function getPrivateUrl(publicUploadthingUrl: string) {
    const imageUrlSplit = publicUploadthingUrl.split('/f/')
    imageUrlSplit.splice(1, 0, `a/${process.env.UPLOADTHING_APP_ID}`)
    return imageUrlSplit.join('/')
}

export async function getBlurredImageUrl(imageUrl: string) {
    try {
        const res = await kyInstance.get(imageUrl)
        const imgBuffer = await res.arrayBuffer()

        const { base64 } = await getPlaiceholder(Buffer.from(imgBuffer))
        return base64
    } catch (err) {
        logger.error(err)
        return null
    }
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

export function getZodIssues<T extends ZodSchema>(
    safeParseError: SafeParseError<z.infer<T>>,
): Partial<Record<keyof z.infer<T>, string>> {
    const result: Partial<Record<keyof z.infer<T>, string>> = {}

    const fieldErrs = safeParseError.error.formErrors.fieldErrors
    for (const key in fieldErrs) {
        const typedKey = key as keyof z.infer<T>

        if (fieldErrs[typedKey]?.length) {
            result[typedKey] = fieldErrs[typedKey]![0] // Take the first error
        }
    }

    return result
}
