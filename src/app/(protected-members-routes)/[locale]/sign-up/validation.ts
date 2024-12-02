import { z } from "zod"

export const formSchema = z.object({
    username: z.string().min(5, { message: 'Username has to be atleast 5 characters long' }),
    email: z.string().email({ message: 'Please insert a valid email address' }),
    password: z.string().min(8, { message: 'Password has to be atleast 8 characters long' }),
})

export type FormData = z.infer<typeof formSchema>