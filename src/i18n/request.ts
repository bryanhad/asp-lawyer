import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Define the locale type based on routing.locales
export type Locale = (typeof routing.locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as Locale)) {       
        locale = routing.defaultLocale
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    }
})