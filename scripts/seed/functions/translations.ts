import { TranslationQuery } from '../../../src/lib/types'
import { Prisma, Translation } from '@prisma/client'
import { EntityType, Language, MemberTranslationKey } from '../../../src/lib/enum'
import { achievementsSeed } from '../data/achievements'
import { dummyMemberAchievements, dummyMemberBios, dummyMemberEducations, dummyMemberExperiences } from '../data/dummy'
import { membersSeed } from '../data/members'
import { practiceAreaSeed } from '../data/practice-areas'
import { TranslationSeed } from '../types'
import { seedAchievements } from './achievements'
import { seedMembers } from './members'
import { seedPracticeAreas } from './practice-areas'
import { getRandomElement, getRandomSubsetFromArray, separateLanguages } from './util'
import { seedUsersAndBlogs } from './user-and-blog'
import { usersAndBlogsSeed } from '../data/users-and-blogs'

type UpsertedMembers = Awaited<ReturnType<typeof seedMembers>>
type UpsertedPracticeAreas = Awaited<ReturnType<typeof seedPracticeAreas>>
type UpsertedAchievements = Awaited<ReturnType<typeof seedAchievements>>
type UpsertedBlogs = Awaited<ReturnType<typeof seedUsersAndBlogs>>

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
function getDummyData_By_TranslationKey(key: MemberTranslationKey): TranslationQuery[] | null {
    switch (key) {
        case MemberTranslationKey.EXPERIENCE:
            return dummyMemberExperiences
        case MemberTranslationKey.EDUCATION:
            return dummyMemberEducations
        case MemberTranslationKey.ACHIEVEMENT:
            return dummyMemberAchievements
        case MemberTranslationKey.BIO:
            return dummyMemberBios
        default:
            return null
    }
}

export async function seedMemberTranslations(prisma: Prisma.TransactionClient, upsertedMembers: UpsertedMembers) {
    for (const [index, memberData] of membersSeed.entries()) {
        const translationPromises: Promise<Translation>[] = []
        // const processedKeys = new Set<string>() // Flag variable to track processed keys

        console.log(`  ⚙️  Seeding translation for member "${memberData.slug}"...`)

        // get each member id
        const memberId = upsertedMembers[index].id

        // iterate through each member's translations
        for (const translationData of memberData.translations) {
            // idk man this is hard..
            /**
             *  if the seed data actually contians the value, I want this to run both for the id and en,
             * but for if it is empty I want it to run once.. but I think it is okay to not care about this..
             * since the this currently works haha..
             *
             * So I commented the flagging for now.. hopefully this works fine..
             *
             */

            /**
             * Since in each member's translation has 2 element of which the key is the same..
             * e.g.:
             * [
             *      {language: Language.EN, key: MemberTranslationKey.BIO, value: ''},
             *      {language: Language.ID, key: MemberTranslationKey.BIO, value: ''},
             *      ...
             * ]
             *
             * We must prevent for this seeding to only run ONCE for every key.
             * I make sure of that by using a flag which is stored in processedKeys Set.
             */

            // const uniqueKey = `${translationData.key}`

            // if (processedKeys.has(uniqueKey)) {
            //     continue // Skip if this key-language combination is already processed
            // }
            // console.log(
            //     `   - Processing "${memberData.slug}"'s "${translationData.key}" translation...`,
            // )
            // Mark the key as processed
            // processedKeys.add(uniqueKey)

            if (typeof translationData.value === 'string') {
                if (translationData.value.trim().length > 0) {
                    // Add string value directly if it has length
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
                } else {
                    // Handle empty string case based on the key
                    const dummyData = getDummyData_By_TranslationKey(translationData.key)
                    if (dummyData) {
                        // Pick a random TranslationQuery object
                        const randomDummy = getRandomElement<TranslationQuery>(dummyData)

                        for (const [language, value] of Object.entries(randomDummy)) {
                            translationPromises.push(
                                createTranslationPromise({
                                    prisma,
                                    entityId: memberId,
                                    entityType: EntityType.MEMBER,
                                    translationData: {
                                        key: translationData.key,
                                        language: language as Language,
                                        value: value,
                                    },
                                }),
                            )
                        }
                    }
                }
            }

            if (Array.isArray(translationData.value)) {
                if (translationData.value.length > 0) {
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
                    const dummyData = getDummyData_By_TranslationKey(translationData.key)
                    if (dummyData) {
                        // Pick a random subset from dummy data
                        /**
                         * example:
                         * When translationData.key === EXPERIENCE:
                         * randomSubset = [
                         *      {en: en_dummy_experience_1, id: id_dummy_experience_1},
                         *      {en: en_dummy_experience_2, id: id_dummy_experience_2},
                         *      ...
                         * ]
                         */
                        const randomSubset = getRandomSubsetFromArray(dummyData)
                        // Separate randomSubset languages:
                        /**
                         * example:
                         * When translationData.key === EXPERIENCE:
                         * ID_AND_EN_TRANSLATION = {
                         *      en: [en_dummy_experience_1, en_dummy_experience_2, ...],
                         *      id: [id_dummy_experience_1, id_dummy_experience_2, ...],
                         * }
                         */
                        const ID_AND_EN_TRANSLATION = separateLanguages(randomSubset)

                        for (const [language, value] of Object.entries(ID_AND_EN_TRANSLATION)) {
                            translationPromises.push(
                                createTranslationPromise({
                                    prisma,
                                    entityId: memberId,
                                    entityType: EntityType.MEMBER,
                                    translationData: {
                                        key: translationData.key,
                                        language: language as Language,
                                        value: JSON.stringify(value),
                                    },
                                }),
                            )
                        }
                    }
                }
            }
        }
        await Promise.all(translationPromises)
        console.log(`  ✅ Successfully seeded translations for member "${memberData.slug}"!`)
    }
}

export async function seedPracticeAreaTranslations(
    prisma: Prisma.TransactionClient,
    upsertedPracticeAreas: UpsertedPracticeAreas,
) {
    for (const [index, practiceAreasData] of practiceAreaSeed.entries()) {
        const translationPromises: Promise<Translation>[] = []

        console.log(`  ⚙️  Seeding translation for practice_area "${practiceAreasData.slug}"...`)

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
        console.log(`  ✅ Successfully seeded translations for practice area "${practiceAreasData.slug}"!`)
    }
}

export async function seedAchievementTranslations(
    prisma: Prisma.TransactionClient,
    upsertedAchievements: UpsertedAchievements,
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

export async function seedBlogTranslations(prisma: Prisma.TransactionClient, upsertedBlogs: UpsertedBlogs) {
    const translationPromises: Promise<Translation>[] = []

    for (const user of usersAndBlogsSeed) {
        for (const [index, blogsData] of user.blogs.entries()) {
            const blogsId = upsertedBlogs[index].id

            for (const translationData of blogsData.translations) {
                translationPromises.push(
                    prisma.translation.upsert({
                        where: {
                            entityId_entityType_language_key: {
                                entityId: blogsId,
                                entityType: EntityType.BLOG,
                                language: translationData.language,
                                key: translationData.key,
                            },
                        },
                        update: {},
                        create: {
                            entityId: blogsId,
                            entityType: EntityType.BLOG,
                            language: translationData.language,
                            key: translationData.key,
                            value: translationData.value,
                        },
                    }),
                )
            }
        }
    }
    await Promise.all(translationPromises)
}
