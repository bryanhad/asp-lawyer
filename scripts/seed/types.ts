import {
    PracticeAreaTranslationKey,
    Language,
    MemberTranslationKey,
    AchievementsTranslationKey,
    MemberRoles,
} from '@/lib/enum'

type TranslationSeed<TranslationKey> = {
    language: Language
    key: TranslationKey
    value: string // Translated text
}

// Define a type for the lawyer data with translations
export type MemberSeed = {
    slug: string
    order: number
    name: string
    imageUrl: string
    linkedInUrl?: string
    email?: string
    translations: TranslationSeed<MemberTranslationKey>[]
    role: MemberRoles
}

export type PracticeAreaSeed = {
    slug: string
    order: number
    imageUrl: string
    translations: TranslationSeed<PracticeAreaTranslationKey>[]
}

export type AchievementsSeed = {
    order: number
    imageUrl: string
    translations: TranslationSeed<AchievementsTranslationKey>[]
}
