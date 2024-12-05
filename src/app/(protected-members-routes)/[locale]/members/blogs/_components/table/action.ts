'use server'

import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { SearchParams } from '../../validation'
import { utapi } from '@/app/api/uploadthing/core'

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
                author: { select: { username: true, email: true, id:true } },
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

export async function deleteBlog(blogId: string): Promise<{success:boolean, message: string}> {
    if (!blogId || typeof blogId !== 'string') {
        return {
            success: false,
            message: 'Invalid field'
        }
    }

    const existingBlog = await prisma.blog.findUnique({
        where: {
            id: blogId
        }
    })

    if (!existingBlog) {
        return {
            success: false,
            message: 'Blog not found'
        }
    }

    
    await Promise.all([
        utapi.deleteFiles(existingBlog.imageKey),
        prisma.blog.delete({
            where: {
                id: blogId
            }
        })  
    ])
}