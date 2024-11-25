import { Prisma, Translation } from '@prisma/client'
import { EntityType, MemberTranslationKey } from '../../../src/lib/enum'
import { achievementsSeed } from '../data/achievements'
import {
    dummyMemberAchievements,
    dummyMemberEducations,
    dummyMemberExperiences,
} from '../data/dummy'
import { membersSeed } from '../data/members'
import { practiceAreaSeed } from '../data/practice-areas'
import { TranslationSeed } from '../types'
import { seedAchievements } from './achievements'
import { seedMembers } from './members'
import { seedPracticeAreas } from './practice-areas'
import { getRandomSubsetFromArray, separateLanguages } from './util'

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
    prisma: Prisma.TransactionClient
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
    prisma: Prisma.TransactionClient,
    upsertedMembers: UpsertedMembers,
) {
    for (const [index, memberData] of membersSeed.entries()) {
        const translationPromises: Promise<Translation>[] = []

        console.log(`\t ⚙️  Seeding translation for member "${memberData.slug}"...`)

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
        await Promise.all(translationPromises)
        console.log(
            `\t ✅ Successfully seeded translations for member "${memberData.slug}"!`,
        )
    }
}

export async function seedPracticeAreaTranslations(
    prisma: Prisma.TransactionClient,
    upsertedPracticeAreas: UspertedPracticeAreas,
) {
    for (const [index, practiceAreasData] of practiceAreaSeed.entries()) {
        const translationPromises: Promise<Translation>[] = []

        console.log(`\t ⚙️  Seeding translation for practice_area "${practiceAreasData.slug}"...`)

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
        await Promise.all(translationPromises)
        console.log(
            `\t ✅ Successfully seeded translations for practice area "${practiceAreasData.slug}"!`,
        )
    }
}

export async function seedAchievementTranslations(
    prisma: Prisma.TransactionClient,
    upsertedAchievements: UspertedAchievements,
) {
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
    await Promise.all(translationPromises)
}
