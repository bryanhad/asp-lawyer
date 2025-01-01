import { headers } from 'next/headers'
import { RefillingTokenBucket } from './rate-limit'
import { getClientIP, isRequestAllowed } from './utils'

export const globalBucket = new RefillingTokenBucket<string>('GLOBAL', 100, 1)

/**
 * @returns {boolean} a boolean, true if token is insufficient on consume
 */
export async function globalGETRateLimit(): Promise<boolean> {
    const clientIP = await getClientIP()
    isRequestAllowed(globalBucket, clientIP, 1)
    if (clientIP === null) {
        return true
    }
    return globalBucket.consume(clientIP, 1)
}

/**
 * @returns {boolean} a boolean, true if token is insufficient on consume
 */
export async function globalPOSTRateLimit(): Promise<boolean> {
    // Note: Assumes X-Forwarded-For will always be defined.
    const clientIP = (await headers()).get('X-Forwarded-For')
    if (clientIP === null) {
        return true
    }
    return globalBucket.consume(clientIP, 3)
}
