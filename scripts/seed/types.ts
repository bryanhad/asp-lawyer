import {
    PracticeAreaTranslationKey,
    Language,
    MemberTranslationKey,
    AchievementsTranslationKey,
    MemberRoles,
    BlogTranslationKey,
} from '@/lib/enum'

export type TranslationSeed<TranslationKey, ValueType = string> = {
    language: Language
    key: TranslationKey
    value: ValueType // Translated text
}

// Define a type for the lawyer data with translations
export type MemberSeed = {
    slug: string
    order: number
    name: string
    imageUrl: string
    linkedInUrl?: string
    email?: string
    translations: TranslationSeed<MemberTranslationKey, string[] | string>[]
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

export type BlogsSeed = {
    id:string
    imageUrl: string
    imageKey: string
    translations: TranslationSeed<BlogTranslationKey>[]
}

export type UsersSeed = {
    id: number,
    email:string,
    username:string,
    password:string,
}