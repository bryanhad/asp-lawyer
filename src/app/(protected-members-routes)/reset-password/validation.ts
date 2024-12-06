import { z } from 'zod'
import { passwordSchema } from '@/app/(protected-members-routes)/lib/validations'

export const resetPasswordFormSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Confirming password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'], // Path of the error
    })
