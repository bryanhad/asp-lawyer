import { z } from 'zod'

export const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 5 characters.',
    }),
    content: z.string().min(10, {
        message: 'content must be at least 10 characters.',
    }),
})
