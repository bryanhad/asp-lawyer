import { Language, TranslationKey } from '@/lib/enum'

type TranslationSeed = {
    language: Language
    key: TranslationKey
    value: string // Translated text
}

// Define a type for the lawyer data with translations
export type LawyerSeed = {
    slug: string
    order: number
    name: string
    linkedInUrl?: string
    email?: string
    translations: TranslationSeed[]
}
