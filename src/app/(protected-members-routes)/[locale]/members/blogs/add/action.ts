'use server'

import { z } from 'zod'
import { formSchema } from './validation'
import prisma from '@/lib/prisma';
import { getCurrentSession } from '@/lib/auth';

export async function addBlogAction(
    data: Partial<z.infer<typeof formSchema>>,
): Promise<{ success: boolean; message: string }> {
    const parsedData = formSchema.safeParse(data)

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
            success:false,
            message: JSON.stringify(parsedData.error.errors)
        }
    }

    const {title, content} = parsedData.data

    await prisma.blog.create({
        data: {
            title,
            contentEnglish: content,
            contentIndonesia: content,
            userId: user.id
        }
    })

    return {
        success:true,
        message: 'New blog has been added'
    }
}
