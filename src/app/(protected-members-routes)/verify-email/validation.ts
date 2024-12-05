import { z } from "zod"

export const formSchema = z.object({
    code: z.string().min(8, { message: 'Email verification code is 8-digits' }),
})