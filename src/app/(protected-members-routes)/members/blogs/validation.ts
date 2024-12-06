import { z } from 'zod'

export const filterSchema = z.object({
    q: z.string().optional(),
    // TODO: PERHAPS MAKE A FILTER FOR CREATED AT??
})

export type FilterValues = z.infer<typeof filterSchema>

export type SearchParams = FilterValues & { size?: string; page?: string }

const MAX_IMAGE_SIZE = 400_880 // 4 MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']

export const uploadImageSchema = z
    .custom<FileList>((val) => val instanceof FileList, 'Image is required')
    .refine((files) => files.length > 0, `Image is required`)
    .refine((files) => files.length <= 1, `Can only select 1 image.`)
    .refine((files) => {
        if (files[0] && files[0].type) {
            return ALLOWED_IMAGE_TYPES.includes(files[0].type)
        }
    }, 'Only these types are allowed .jpg, .jpeg, and .png')
    .refine((files) => {
        if (files[0] && files[0].size) {
            return files[0].size <= MAX_IMAGE_SIZE
        }
    }, `File size should be less than 4 MB.`)

export const addBlogFormSchemaClient = z.object({
    titleID: z.string().min(2, {
        message: 'Title must be at least 5 characters.',
    }),
    titleEN: z.string().min(2, {
        message: 'Title must be at least 5 characters.',
    }),
    contentID: z.string().min(10, {
        message: 'content must be at least 10 characters.',
    }),
    contentEN: z.string().min(10, {
        message: 'content must be at least 10 characters.',
    }),
    thumbnail: uploadImageSchema,
})

export const addBlogFormSchemaServer = addBlogFormSchemaClient.extend({
    thumbnail: z.custom<File>((val) => val instanceof File, 'Picture must be a file type'),
})

export const editBlogFormSchemaClient = addBlogFormSchemaClient.extend({
    thumbnail: uploadImageSchema.optional(),
})

export const editBlogFormSchemaServer = editBlogFormSchemaClient.extend({
    blogId: z.string(),
    thumbnail: z.custom<File>((val) => val instanceof File, 'Picture must be a file type').optional(),
    currentBlogImageKey: z.string()
})
