import { z } from 'zod'

export const filterSchema = z.object({
    q: z.string().optional(),
    // TODO: PERHAPS MAKE A FILTER FOR CREATED AT??
})

export type FilterValues = z.infer<typeof filterSchema>

export type SearchParams = FilterValues & { size?: string; page?: string }
