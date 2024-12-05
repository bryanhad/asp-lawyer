'use server'

import { z } from 'zod'
import { formSchemaClient, formSchemaServer } from './validation'
import prisma from '@/lib/prisma'
import { getCurrentSession } from '@/lib/auth'
import { utapi } from '@/app/api/uploadthing/core'
import { UploadThingError } from 'uploadthing/server'
import { logger } from '@/lib/logger'

export async function addBlogAction(
    data: Partial<z.infer<typeof formSchemaClient>>,
): Promise<{ success: boolean; message: string }> {
    const parsedData = formSchemaServer.safeParse({
        ...data,
        thumbnail: data.thumbnail ? data.thumbnail[0] : undefined,
    })

    const { session, user } = await getCurrentSession()
    if (session === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }

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

    const { title, content, thumbnail } = parsedData.data

    try {
        const { data: uploadedFileData, error } = await utapi.uploadFiles(thumbnail)
        if (error) {
            logger.error(error)
            return {
                success: false,
                message: error.message,
            }
        }
        await prisma.blog.create({
            data: {
                title,
                contentEnglish: content,
                contentIndonesia: content,
                userId: user.id,
                imageUrl: uploadedFileData.appUrl,
                imageKey: uploadedFileData.key
            },
        })
        return {
            success: true,
            message: 'New blog has been added',
        }
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
}
