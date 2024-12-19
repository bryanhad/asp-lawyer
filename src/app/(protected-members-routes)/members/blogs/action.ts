'use server'

import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { utapi } from '@/app/api/uploadthing/core'
import { BlogTranslationKey, EntityType, Language } from '@/lib/enum'
import { logger } from '@/lib/logger'
import prisma from '@/lib/prisma'
import { Blog, Prisma, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { redirect } from 'next/navigation'
import { UploadThingError } from 'uploadthing/server'
import { FileEsque, UploadedFileData } from 'uploadthing/types'
import { z } from 'zod'
import { globalPOSTRateLimit } from '../../lib/server/request'
import {
    addBlogFormSchemaClient,
    addBlogFormSchemaServer,
    editBlogFormSchemaClient,
    editBlogFormSchemaServer,
    SearchParams,
} from './validation'
import { getBlurredImageUrls } from '@/lib/server-utils'
import { revalidatePath } from 'next/cache'

type FetchedBlogEntry = Pick<Blog, 'id' | 'imageUrl' | 'createdAt'> & {
    title: { id: string; en: string }
    author: Pick<User, 'id' | 'username'>
}

type BlogData = FetchedBlogEntry & {
    blurImageUrl: string | null
}

export async function getData({
    filterValues,
    createdByUserId: _createdByUserId,
}: Partial<{
    filterValues: SearchParams
    createdByUserId: string
}> = {}): Promise<{
    blogs: BlogData[]
    totalDataCount: number
    totalAvailablePages: number
    isUsingFilter: boolean
    fetchSize: number
}> {
    const { q, page, size } = filterValues ?? {}
    const isUsingFilter = !!q
    const currentPage = Number(page) || 1
    const fetchSize = Number(size) || 5

    const searchString = q
        ?.split(' ')
        .filter((word) => word.length > 0)
        .join(' ')

    const offset = (currentPage - 1) * fetchSize

    const [query, countRes] = await Promise.all([
        prisma.$queryRaw<FetchedBlogEntry[]>`
             SELECT 
            b."id", b."imageUrl", b."createdAt", 
            -- get author details
            jsonb_build_object(
                'id', u."id",
                'username', u."username"
            ) AS author,
            -- get title: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.TITLE} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.TITLE} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS title
            FROM blogs b
            LEFT JOIN translations AS t 
                ON t."entityId" = b."id" 
                AND t."entityType" = ${EntityType.BLOG}
                AND t."key" IN (${BlogTranslationKey.TITLE})
            LEFT JOIN users u
                ON u."id" = b."authorId"
            ${
                searchString
                    ? Prisma.sql`WHERE 
                        t."value" ILIKE ${`%${searchString}%`} 
                        OR u."username" ILIKE ${`%${searchString}%`}
                    `
                    : Prisma.empty
            }
            GROUP BY b."id", b."imageUrl", b."createdAt", u."id"
            LIMIT ${fetchSize} OFFSET ${offset}
        `,
        prisma.$queryRaw<{ count: number }[]>`SELECT COUNT(*) as count FROM blogs b`,
    ])

    // Step 1: Collect image URLs
    const imageUrls = query.map((blog) => blog.imageUrl)
    // Step 2: Get blurred images for all URLs concurrently
    const blurredImageUrls = await getBlurredImageUrls(imageUrls)
    // // Step 3: Transform lawyers data, including blurred images
    const transformedBlog = query.map((blog, i) => {
        const result = {
            ...blog,
            imageUrl: imageUrls[i],
            blurImageUrl: blurredImageUrls[i],
        }
        return result
    })

    const totalDataCount = Number(countRes[0].count)
    const totalAvailablePages = Math.ceil(Number(totalDataCount) / fetchSize)

    return {
        blogs: transformedBlog,
        totalDataCount,
        totalAvailablePages,
        isUsingFilter,
        fetchSize,
    }
}

export async function addBlogAction(
    data: Partial<z.infer<typeof addBlogFormSchemaClient>>,
): Promise<{ success: boolean; message: string }> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const { session, user } = await getCurrentSession()
    if (session === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

    const parsedData = addBlogFormSchemaServer.safeParse({
        ...data,
        thumbnail: data.thumbnail ? data.thumbnail[0] : undefined,
    })

    /**
     * This return should not be possible to be called from the ui,
     * since 'add blog' form can only be submitted if the js is loaded
     *
     * and the validation of the inputs should be handled from the via react-hook-form..
     *
     * So, we can just give back an ugly response message..
     */
    if (!parsedData.success) {
        return {
            success: false,
            message: JSON.stringify(parsedData.error.errors),
        }
    }

    const { titleEN, titleID, contentEN, contentID, thumbnail } = parsedData.data

    try {
        const { data: uploadedFileData, error } = await utapi.uploadFiles(thumbnail)
        if (error) {
            logger.error(error)
            return {
                success: false,
                message: error.message,
            }
        }
        prisma.$transaction(async (tx) => {
            const newBlog = await tx.blog.create({
                data: {
                    authorId: user.id,
                    imageUrl: uploadedFileData.appUrl,
                    imageKey: uploadedFileData.key,
                },
                select: { id: true },
            })

            await prisma.translation.createMany({
                data: [
                    {
                        entityType: EntityType.BLOG,
                        entityId: newBlog.id,
                        key: BlogTranslationKey.TITLE,
                        language: Language.EN,
                        value: titleEN,
                    },
                    {
                        entityType: EntityType.BLOG,
                        entityId: newBlog.id,
                        key: BlogTranslationKey.TITLE,
                        language: Language.ID,
                        value: titleID,
                    },
                    {
                        entityType: EntityType.BLOG,
                        entityId: newBlog.id,
                        key: BlogTranslationKey.CONTENT,
                        language: Language.EN,
                        value: contentEN,
                    },
                    {
                        entityType: EntityType.BLOG,
                        entityId: newBlog.id,
                        key: BlogTranslationKey.CONTENT,
                        language: Language.ID,
                        value: contentID,
                    },
                ],
            })
        })
    } catch (err) {
        logger.error(JSON.stringify(err))
        if (err instanceof UploadThingError) {
            return {
                success: false,
                message: `Failed to upload: ${err.cause}`,
            }
        }
        return {
            success: false,
            message: 'Server Error',
        }
    }
    revalidatePath(`/en/blogs`)
    revalidatePath(`/id/blogs`)
    return redirect(`/members/blogs?toast=${encodeURIComponent(`New blog has been added`)}`)
}

/**
 * Handles the update of a blog's thumbnail by deleting the current image
 * and uploading a new one. Throws an error if any operation fails.
 *
 * @param newThumbnail - The new thumbnail file to be uploaded
 * @param currentBlogImageKey - The key of the current blog image key to be deleted
 * @returns UploadedFileData for the new thumbnail or undefined if no new thumbnail is provided
 * @throws Error if deletion or upload fails
 */
async function handleUpdateThumbnail(
    newThumbnail: FileEsque,
    currentBlogImageKey: string,
): Promise<UploadedFileData | undefined> {
    if (!newThumbnail) return undefined

    const [deleteRes, uploadRes] = await Promise.allSettled([
        utapi.deleteFiles(currentBlogImageKey),
        utapi.uploadFiles(newThumbnail),
    ])

    // Handle deletion failure
    if (deleteRes?.status === 'rejected' || !deleteRes?.value?.success) {
        throw new Error('Failed to delete previous image')
    }

    // Handle upload failure
    if (uploadRes?.status === 'rejected' || uploadRes?.value?.error) {
        throw new Error(
            uploadRes?.status === 'rejected'
                ? 'Failed to upload image'
                : uploadRes.value.error?.message || 'An unknown error occurred during upload',
        )
    }
    // Extract upload data and check for errors
    const { data: uploadedFileData, error } = uploadRes.value
    if (error) {
        throw new Error(error.message || 'Unknown upload error')
    }
    return uploadedFileData
}

/**
 * Handles the update of a blog, including validation, translation updates,
 * thumbnail updates, and ensuring user ownership.
 *
 * @param blogId - The ID of the blog to update
 * @param currentBlogImageKey - The key of the current blog image
 * @param data - Partial data for updating the blog
 * @returns An object containing success status and the message of the resulting operation
 */
export async function editBlogAction(
    blogId: unknown,
    currentBlogImageKey: unknown,
    data: Partial<z.infer<typeof editBlogFormSchemaClient>>,
): Promise<{ success: boolean; message: string }> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const { session, user } = await getCurrentSession()
    if (session === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

    // Validate input data
    const parsedData = editBlogFormSchemaServer.safeParse({
        ...data,
        thumbnail: data.thumbnail ? data.thumbnail[0] : undefined,
        blogId,
        currentBlogImageKey,
    })

    /**
     * This return should not be possible to be called from the ui,
     * since 'add blog' form can only be submitted if the js is loaded
     *
     * and the validation of the inputs should be handled from the via react-hook-form..
     *
     * So, we can just give back an ugly response message..
     */
    if (!parsedData.success) {
        return {
            success: false,
            message: JSON.stringify(parsedData.error.errors),
        }
    }

    const { blogId: parsedBlogId, currentBlogImageKey: parsedCurrentBlogImageKey, ...parsedInput } = parsedData.data

    try {
        const existingBlog = await prisma.blog.findUnique({
            select: { authorId: true, imageKey: true },
            where: {
                id: parsedBlogId,
            },
        })

        if (!existingBlog) {
            return {
                success: false,
                message: 'Blog not found',
            }
        }
        if (existingBlog.authorId !== user.id) {
            return {
                success: false,
                message: 'You are not the owner',
            }
        }

        // Handle thumbnail update if a new one is provided
        if (parsedInput.thumbnail) {
            const res = await handleUpdateThumbnail(parsedInput.thumbnail, parsedCurrentBlogImageKey)
            if (res)
                await prisma.blog.update({
                    data: {
                        imageUrl: res.appUrl,
                        imageKey: res.key,
                    },
                    where: {
                        id: parsedBlogId,
                    },
                })
        }

        // Update blog translations
        const translations = [
            { value: parsedInput.titleEN, key: BlogTranslationKey.TITLE, language: Language.EN },
            { value: parsedInput.titleID, key: BlogTranslationKey.TITLE, language: Language.ID },
            { value: parsedInput.contentEN, key: BlogTranslationKey.CONTENT, language: Language.EN },
            { value: parsedInput.contentID, key: BlogTranslationKey.CONTENT, language: Language.ID },
        ]
        await Promise.all(
            translations.map((translation) =>
                prisma.translation.updateMany({
                    data: { value: translation.value },
                    where: {
                        entityId: parsedBlogId,
                        key: translation.key,
                        language: translation.language,
                    },
                }),
            ),
        )
    } catch (err) {
        logger.error(JSON.stringify(err))
        if (err instanceof UploadThingError) {
            return {
                success: false,
                message: `Failed to upload: ${err.cause}`,
            }
        }
        if (err instanceof Error) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
        return { success: false, message: 'Internal Server Error' }
    }
    revalidatePath(`/en/blogs`)
    revalidatePath(`/id/blogs`)
    revalidatePath(`/en/blogs/${blogId}`)
    revalidatePath(`/id/blogs/${blogId}`)
    return redirect(`/members/blogs?toast=${encodeURIComponent(`Successfully updated blog`)}`)
}

export async function deleteBlogAction(blogId: unknown): Promise<{ success: boolean; message: string }> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const { session, user } = await getCurrentSession()
    if (session === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

    if (!blogId || typeof blogId !== 'string') {
        return {
            success: false,
            message: 'Invalid argument',
        }
    }

    try {
        const existingBlog = await prisma.blog.findUnique({
            select: { authorId: true, imageKey: true },
            where: {
                id: blogId,
            },
        })

        if (!existingBlog) {
            return {
                success: false,
                message: 'Blog not found',
            }
        }
        if (existingBlog.authorId !== user.id) {
            return {
                success: false,
                message: 'You are not the owner',
            }
        }

        await Promise.all([
            utapi.deleteFiles(existingBlog.imageKey),
            prisma.blog.delete({
                where: {
                    id: blogId,
                },
            }),
        ])
        revalidatePath(`/en/blogs`)
        revalidatePath(`/id/blogs`)
        return {
            success: true,
            message: 'Successfully deleted blog',
        }
    } catch (err) {
        logger.error(err)
        if (err instanceof PrismaClientKnownRequestError) {
            return {
                success: false,
                message: err.message,
            }
        }
        return {
            success: false,
            message: 'Internal Server Error',
        }
    }
}
