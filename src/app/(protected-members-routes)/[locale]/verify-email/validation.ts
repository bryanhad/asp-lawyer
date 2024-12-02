import { z } from "zod"

export const verifyEmailFormSchema = z.object({
    code: z.string().min(8, { message: 'Email verification code is 8-digits' }),
})

export type VerifyEmailFormData = z.infer<typeof verifyEmailFormSchema>