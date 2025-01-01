import { logger } from '@/lib/logger'
import { encodeBase32UpperCaseNoPadding } from '@oslojs/encoding'
import { headers } from 'next/headers'
import { RefillingTokenBucket } from './rate-limit'

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

/**
 * Constructs a URL with a query string from the provided path and parameters.
 *
 * @param {string} path - The base path of the URL (e.g., "/verify-email").
 * @param {Record<string, string>} params - An object representing query parameters where the keys are parameter names and values are their corresponding values.
 * @returns {string} The full URL with the query string appended.
 *
 * @example
 * const url = createRedirectUrl('/verify-email', { code: 'abc123', toast: 'Email verification pending' });
 * // Output: "/verify-email?code=abc123&toast=Email+verification+pending"
 */
export function createRedirectUrl(path: string, params: Record<string, string>): string {
    const queryString = new URLSearchParams(params).toString()
    return `${path}?${queryString}`
}

export type RedirectUrlArgs = { path: string; params: Record<string, string> }

/**
 * Assumes X-Forwarded-For is always included.
 */
export async function getClientIP() {
    const clientIP = (await headers()).get('X-Forwarded-For')
    logger.info(`Current client IP: ${clientIP}`)
    return clientIP
}

/**
 * @returns {boolean}
 * - `true` if the key is null or the token is sufficient.
 * - `false` if the token is insufficient.
 */
export function isRequestAllowed<_Key>(bucket: RefillingTokenBucket<_Key>, key: _Key | null, cost: number) {
    if (key !== null) {
        return bucket.isAllowed(key, cost)
    }
    return true
}

/**
 * @returns {boolean}
 * - `true` if token is insufficient
 * - `false` if consume successful or key is null
 */     
export function consumeToken<_Key>(bucket: RefillingTokenBucket<_Key>, key: _Key | null, cost: number) {
    if (key !== null) {
        return !bucket.consume(key, cost)
    }
    return false
}
