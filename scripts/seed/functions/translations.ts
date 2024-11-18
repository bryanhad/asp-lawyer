import { PrismaClient, Translation } from '@prisma/client'
import { lawyersSeed } from '../data/lawyers'
import { seedLawyers } from './lawyers'
import { EntityType } from '../../../src/lib/enum'
import { practiceAreaSeed } from '../data/practice-areas'
import { seedPracticeAreas } from './practice-areas'
import { seedAchievements } from './achievements'
import { achievementsSeed } from '../data/achievements'
type UpsertedLawyers = Awaited<ReturnType<typeof seedLawyers>>
type UspertedPracticeAreas = Awaited<ReturnType<typeof seedPracticeAreas>>
type UspertedAchievements = Awaited<ReturnType<typeof seedAchievements>>

export async function seedLawyerTranslations(
    prisma: PrismaClient,
    upsertedLawyers: UpsertedLawyers,
): Promise<Promise<Translation>[]> {
    const translationPromises: Promise<Translation>[] = []

    for (const [index, lawyerData] of lawyersSeed.entries()) {
        const lawyerId = upsertedLawyers[index].id

        for (const translationData of lawyerData.translations) {
            translationPromises.push(
                prisma.translation.upsert({
                    where: {
                        entityId_entityType_language_key: {
                            entityId: lawyerId,
                            entityType: EntityType.LAWYER,
                            language: translationData.language,
                            key: translationData.key,
                        },
                    },
                    update: {},
                    create: {
                        entityId: lawyerId,
                        entityType: EntityType.LAWYER,
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
