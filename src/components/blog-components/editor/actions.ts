'use server'

import prisma from '@/lib/prisma'
import { createBlogSchema } from '@/lib/validation'

export async function submitBlog(input: string) {
    // TODO: CHECK FOR VALIDATION

    const { title } = createBlogSchema.parse({ title: input })

    await prisma.blog.create({
        data: {
            title,
            contentEnglish: 'This is english!',
            contentIndonesia: 'Ini indonesia!',
        },
    })
}
