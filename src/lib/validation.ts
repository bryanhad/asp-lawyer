import { z } from 'zod'

const requiredString = z.string().trim().min(1, 'Required')

export const createMemberSchema = z.object({
    name: requiredString,
})

export const createBlogSchema = z.object({
    title: requiredString,
})
