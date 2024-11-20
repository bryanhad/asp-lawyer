import { PrismaClient, Translation } from '@prisma/client'
import { membersSeed } from '../data/members'
import { seedMembers } from './members'
import { EntityType, MemberTranslationKey } from '../../../src/lib/enum'
import { practiceAreaSeed } from '../data/practice-areas'
import { seedPracticeAreas } from './practice-areas'
import { seedAchievements } from './achievements'
import { achievementsSeed } from '../data/achievements'
import { getRandomSubsetFromArray, separateLanguages } from './util'
import {
    dummyMemberAchievements,
    dummyMemberEducations,
    dummyMemberExperiences,
} from '../data/dummy'
import { TranslationSeed } from '../types'

type UpsertedMembers = Awaited<ReturnType<typeof seedMembers>>
type UspertedPracticeAreas = Awaited<ReturnType<typeof seedPracticeAreas>>
type UspertedAchievements = Awaited<ReturnType<typeof seedAchievements>>

// Helper function to create the Prisma upsert promise
function createTranslationPromise({
    prisma,
    entityId,
    entityType,
    translationData,
}: {
    prisma: PrismaClient
    entityId: string
    entityType: string
    translationData: TranslationSeed<string>
}): Promise<Translation> {
    return prisma.translation.upsert({
        where: {
            entityId_entityType_language_key: {
                entityId,
                entityType,
                language: translationData.language,
                key: translationData.key,
            },
        },
        update: {},
        create: {
            entityId,
            entityType,
            language: translationData.language,
            key: translationData.key,
            value: translationData.value,
        },
    })
}

// Helper function to get dummy data based on the key
function getDummyDataForKey(
    key: MemberTranslationKey,
): { en: string; id: string }[] | null {
    switch (key) {
        case MemberTranslationKey.EXPERIENCE:
            return dummyMemberExperiences
        case MemberTranslationKey.EDUCATION:
            return dummyMemberEducations
        case MemberTranslationKey.ACHIEVEMENT:
            return dummyMemberAchievements
        default:
            return null
    }
}

export async function seedMemberTranslations(
    prisma: PrismaClient,
    upsertedMembers: UpsertedMembers,
): Promise<Promise<Translation>[]> {
    const translationPromises: Promise<Translation>[] = []

    for (const [index, memberData] of membersSeed.entries()) {
        // get each member id
        const memberId = upsertedMembers[index].id

        // iterate through each member's translations
        for (const translationData of memberData.translations) {
            if (typeof translationData.value === 'string') {
                // Add string value directly
                translationPromises.push(
                    createTranslationPromise({
                        prisma,
                        entityId: memberId,
                        entityType: EntityType.MEMBER,
                        translationData: {
                            ...translationData,
                            value: translationData.value,
                        },
                    }),
                )
            }

            if (Array.isArray(translationData.value)) {
                if (translationData.value.length > 1) {
                    // Add array value directly if it has items
                    translationPromises.push(
                        createTranslationPromise({
                            prisma,
                            entityId: memberId,
                            entityType: EntityType.MEMBER,
                            translationData: {
                                ...translationData,
                                value: JSON.stringify(translationData.value),
                            },
                        }),
                    )
                } else {
                    // Handle empty array case based on the translation key
                    const dummyData = getDummyDataForKey(translationData.key)
                    if (dummyData) {
                        const randomSubset = getRandomSubsetFromArray(dummyData)
                        const ID_AND_EN_Values = separateLanguages(randomSubset)

                        for (const ID_OR_EN_value of ID_AND_EN_Values) {
                            translationPromises.push(
                                createTranslationPromise({
                                    prisma,
                                    entityId: memberId,
                                    entityType: EntityType.MEMBER,
                                    translationData: {
                                        ...translationData,
                                        value: JSON.stringify(ID_OR_EN_value),
                                    },
                                }),
                            )
                        }
                    }
                }
            }
        }
    }
    return translationPromises
}

export async function seedPracticeAreaTranslations(
    prisma: PrismaClient,
    upsertedPracticeAreas: UspertedPracticeAreas,
): Promise<Promise<Translation>[]> {
    const translationPromises: Promise<Translation>[] = []

    for (const [index, practiceAreasData] of practiceAreaSeed.entries()) {
        const practiceAreasId = upsertedPracticeAreas[index].id

        for (const translationData of practiceAreasData.translations) {
            translationPromises.push(
                prisma.translation.upsert({
                    where: {
                        entityId_entityType_language_key: {
                            entityId: practiceAreasId,
                            entityType: EntityType.PRACTICE_AREA,
                            language: translationData.language,
                            key: translationData.key,
                        },
                    },
                    update: {},
                    create: {
                        entityId: practiceAreasId,
                        entityType: EntityType.PRACTICE_AREA,
                        language: translationData.language,
                        key: translationData.key,
                        value: translationData.value,
                    },
                }),
            )
        }
    }
    return translationPromises
}

export async function seedAchievementTranslations(
    prisma: PrismaClient,
    upsertedAchievements: UspertedAchievements,
): Promise<Promise<Translation>[]> {
    const translationPromises: Promise<Translation>[] = []

    for (const [index, achievementsData] of achievementsSeed.entries()) {
        const achievementsId = upsertedAchievements[index].id

        for (const translationData of achievementsData.translations) {
            translationPromises.push(
                prisma.translation.upsert({
                    where: {
                        entityId_entityType_language_key: {
                            entityId: achievementsId,
                            entityType: EntityType.ACHIEVEMENT,
                            language: translationData.language,
                            key: translationData.key,
                        },
                    },
                    update: {},
                    create: {
                        entityId: achievementsId,
                        entityType: EntityType.ACHIEVEMENT,
                        language: translationData.language,
                        key: translationData.key,
                        value: translationData.value,
                    },
                }),
            )
        }
    }
    return translationPromises
}
