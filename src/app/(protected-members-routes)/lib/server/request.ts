import { logAction } from '@/lib/logger'
import { RefillingTokenBucket } from './rate-limit'
import { getClientIP } from './utils'

export const globalBucket = new RefillingTokenBucket<string>('GLOBAL_TOKEN_BUCKET', 100, 1)

/**
 * - `true` if the key is null or the token is sufficient.
 * - `false` if the token is insufficient.
 *
 * @returns isOK
 */
export async function globalGETRateLimit(): Promise<boolean> {
    const clientIP = await getClientIP()
    if (clientIP === null) {
        logAction(globalBucket.name, `client IP from 'X-Forwarded-For' is null. Allowing GET request.`)
        return true
    }
    const isOK = !globalBucket.consume(clientIP, 1)
    logAction(globalBucket.name, `${isOK ? 'allow' : 'deny'} GET request`)

    return isOK
}

/**
 * - `true` if the key is null or the token is sufficient.
 * - `false` if the token is insufficient.
 *
 * @returns isOK
 */
export async function globalPOSTRateLimit(clientIP: string | null): Promise<boolean> {
    if (clientIP === null) {
        logAction(globalBucket.name, `client IP from 'X-Forwarded-For' is null. Allowing POST request.`)
        return true
    }
    const isOK = !globalBucket.consume(clientIP, 3)
    logAction(globalBucket.name, `${isOK ? 'allow' : 'deny'} POST request`)

    return isOK
}
