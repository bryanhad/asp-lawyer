import { z } from 'zod'
import { emailSchema, passwordSchema } from '../../lib/validations'

export const updateEmailFormSchema = z.object({
    email: emailSchema,
})

export const updatePasswordFormSchema = z.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
})
