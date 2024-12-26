import { z } from 'zod'
import { passwordSchema } from '../lib/validations'

export const formSchema = z
    .object({
        username: z.string().min(5, 'Username has to be at least 5 characters long'),
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Confirming password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'], // Path of the error
    })

export type FormData = z.infer<typeof formSchema>
