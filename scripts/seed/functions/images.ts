import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import { utapi } from '../../../src/app/api/uploadthing/core'

// Define a schema for the image validation
const imageSchema = z.object({
    slug: z.string(),
    path: z.string().refine((val) => {
        try {
            const fileSize = fs.statSync(val).size
            if (fileSize > 250 * 1024) {
                throw new Error('File size exceeds 250 KB')
            }
            return true
        } catch (err) {
            /**
             * Zod captures the thrown error and uses its message as the validation message.
             * So the resulting error for each failing file will be
             * one of the specified thrown error's message.
             */
            if (err instanceof Error) {
                if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
                    // ENOENT is 'file not found'
                    throw new Error(`File not found at path: ${val}`)
                }
                throw err // Re-throw other errors
            }
            throw new Error('An unknown error occurred')
        }
    }),
})

export type UploadSeedImageResult = {
    slug: string
    url: string
    fileName: string
}

export async function seedLawyerImages(
    slugs: string[],
): Promise<UploadSeedImageResult[]> {
    const files: File[] = []
    const slugMapping: { [key: string]: string } = {} // Map each file name to its slug

    for (const slug of slugs) {
        const filePath = path.resolve(
            process.cwd(),
            `scripts/seed/data/images/lawyers/${slug}.png`,
        )

        const validation = imageSchema.safeParse({ slug, path: filePath })
        if (!validation.success) {
            throw new Error(
                `Error with ${slug}.png: ${validation.error.message}`,
            )
        }

        const imageBuffer = fs.readFileSync(filePath)
        const file = new File([imageBuffer], `${slug}.png`, {
            type: 'image/png',
        })
        files.push(file)
        slugMapping[file.name] = slug // Map file name to slug for tracking
    }

    const uploadResults = await utapi.uploadFiles(files)

    const results: UploadSeedImageResult[] = uploadResults.map((result) => {
        if (result.data === null || result.error !== null) {
            // Throw an error with details if the upload failed for this file
            throw new Error(`Upload failed. Error: ${result.error}`)
        }
        return {
            slug: slugMapping[result.data.name],
            url: result.data.appUrl,
            fileName: result.data.name,
        }
    })

    return results
}
