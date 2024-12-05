'use server'

import { utapi } from '@/app/api/uploadthing/core'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { logger } from '@/lib/logger'
import { SearchParams } from './validation'
import { formSchemaClient, formSchemaServer } from './validation'
import { z } from 'zod'
import { getCurrentSession } from '@/lib/auth'
import { UploadThingError } from 'uploadthing/server'

export async function getData({
    filterValues,
    createdByUserId,
    defaultFetchSize,
}: {
    filterValues: SearchParams
    defaultFetchSize: number
    createdByUserId?: string
}) {
    const { q, page, size } = filterValues
    const isUsingFilter = !!q
    const currentPage = Number(page) || 1
    const fetchSize = Number(size) || defaultFetchSize

    const searchString = q
        ?.split(' ')
        .filter((word) => word.length > 0)
        .join(' ')

    const searchFilter: Prisma.BlogWhereInput = searchString
        ? {
              // we use "OR" filter, so that the searh filter will work on any columns that we specify
              OR: [
                  {
                      title: {
                          contains: searchString,
                          mode: 'insensitive',
                      },
                  },
              ],
          }
        : {}

    const createdBySearchFilter: Prisma.BlogWhereInput =
        searchString || createdByUserId
            ? {
                  author: {
                      OR: [
                          createdByUserId
                              ? {
                                    id: createdByUserId,
                                }
                              : undefined,
                          searchString
                              ? {
                                    name: {
                                        contains: searchString,
                                        mode: 'insensitive',
                                    },
                                }
                              : undefined,
                          searchString
                              ? {
                                    email: {
                                        contains: searchString,
                                        mode: 'insensitive',
                                    },
                                }
                              : undefined,
                      ].filter(Boolean) as Prisma.UserWhereInput[], // This filters out undefined values
                  },
              }
            : {}

    const whereFilter: Prisma.BlogWhereInput = {
        AND: [searchFilter, createdBySearchFilter],
    }

    const offset = (currentPage - 1) * fetchSize

    const [blogs, totalDataCount] = await Promise.all([
        prisma.blog.findMany({
            skip: offset,
            take: fetchSize,
            select: {
                id: true,
                title: true,
                createdAt: true,
                imageUrl: true,
                author: { select: { username: true, email: true, id: true } },
            },
            where: whereFilter,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.blog.count({
            where: whereFilter,
        }),
    ])

    const totalAvailablePages = Math.ceil(Number(totalDataCount) / fetchSize)

    return {
        blogs,
        totalDataCount,
        totalAvailablePages,
        isUsingFilter,
        fetchSize,
    }
}

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
                imageKey: uploadedFileData.key,
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

export async function deleteBlogAction(blogId: string): Promise<{ success: boolean; message: string }> {
    if (!blogId || typeof blogId !== 'string') {
        return {
            success: false,
            message: 'Invalid field',
        }
    }

    try {
        const existingBlog = await prisma.blog.findUnique({
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

        await Promise.all([
            utapi.deleteFiles(existingBlog.imageKey),
            prisma.blog.delete({
                where: {
                    id: blogId,
                },
            }),
        ])
        return {
            success: true,
            message: 'Successfully deleted blog',
        }
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            return {
                success: false,
                message: err.message,
            }
        }
        logger.error(err)
        return {
            success: false,
            message: 'Internal Server Error',
        }
    }
}
