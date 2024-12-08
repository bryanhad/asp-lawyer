import { ZodSchema } from "zod"
import { getZodIssues } from "./server-utils"

export type TranslationQuery = {
    id: string
    en: string
}

export type FormState<T extends ZodSchema> = {
    message: string
    success: boolean
    fields?: Record<string, string> // to re-populate the input fields which is from the client
    issues?: ReturnType<typeof getZodIssues<T>> // to show any input errors from the fromschema
}
