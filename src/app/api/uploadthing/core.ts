import { getCurrentSession } from '@/lib/auth'
import { logger } from '@/lib/logger'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError, UTApi } from 'uploadthing/server'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const uploadThingFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({
        image: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
            maxFileSize: '4MB',
            maxFileCount: 1,
        },
    })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req: _req }) => {
            // This code runs on your server before upload
            const { session, user } = await getCurrentSession()

            // If you throw, the user will not be able to upload
            if (!session) throw new UploadThingError('Unauthorized')

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { username: user.username }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            logger.info('Upload complete for username:', metadata.username)
            logger.info('file url', file.url)

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.username }
        }),
} satisfies FileRouter

export type UploadThingFileRouter = typeof uploadThingFileRouter
export const utapi = new UTApi()
