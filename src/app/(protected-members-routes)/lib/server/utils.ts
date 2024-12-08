import { Locale } from '@/i18n/request'
import { encodeBase32UpperCaseNoPadding } from '@oslojs/encoding'
import { getLocale } from 'next-intl/server'
import { cache } from 'react'

export function generateRandomOTP(): string {
    const bytes = new Uint8Array(5)
    crypto.getRandomValues(bytes)
    const code = encodeBase32UpperCaseNoPadding(bytes)
    return code
}

export function generateRandomRecoveryCode(): string {
    const recoveryCodeBytes = new Uint8Array(10)
    crypto.getRandomValues(recoveryCodeBytes)
    const recoveryCode = encodeBase32UpperCaseNoPadding(recoveryCodeBytes)
    return recoveryCode
}

export const getCurrentLocale = cache(async () => {
    return (await getLocale()) as Locale
})
