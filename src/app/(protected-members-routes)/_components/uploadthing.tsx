import { generateUploadButton, generateUploadDropzone } from '@uploadthing/react'
import { generateReactHelpers } from '@uploadthing/react'

import type { UploadThingFileRouter } from '@/app/api/uploadthing/core'

export const UploadThingButton = generateUploadButton<UploadThingFileRouter>()
export const UploadThingDropzone = generateUploadDropzone<UploadThingFileRouter>()

export const { useUploadThing, uploadFiles } = generateReactHelpers<UploadThingFileRouter>()
