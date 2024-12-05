import NoResult from '@/components/ui/no-result'
import prisma from '@/lib/prisma'
import React from 'react'
import BlogsTable from './_components/table/table'
import { Props as BlogsTableProps } from './_components/table/table'

type Props = BlogsTableProps

export default async function FetchComponent({ searchParams }: Props) {
    const blogs = await prisma.blog.findMany({
        select: {
            title: true,
            id: true,
            imageUrl: true,
            createdAt: true,
            author: {
                select: { username: true, id: true },
            },
        },
    })

    return (
        <>
            {blogs.length > 0 && <BlogsTable searchParams={searchParams} />}
            {blogs.length < 1 && <NoResult title="No Blogs found" desc="Add a new blog" />}
        </>
    )
}
