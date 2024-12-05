import { z } from 'zod'

const MAX_IMAGE_SIZE = 400_880 // 4 MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']

export const uploadImageSchema = z
    .custom<FileList>((val) => val instanceof FileList, 'Required')
    .refine((files) => files.length > 0, `Required`)
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



export const formSchemaClient = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 5 characters.',
    }),
    content: z.string().min(10, {
        message: 'content must be at least 10 characters.',
    }),
    thumbnail: uploadImageSchema,
})

export const formSchemaServer = formSchemaClient.extend({
    thumbnail: z.custom<File>((val) => val instanceof File, 'Picture must be a file type'),
})