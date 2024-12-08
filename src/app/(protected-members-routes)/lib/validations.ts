import { z } from 'zod'

export const emailSchema = z.string().email({ message: 'Please insert a valid email address' })

export const passwordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
