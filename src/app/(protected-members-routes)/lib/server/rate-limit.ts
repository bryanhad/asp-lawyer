import { logger } from '@/lib/logger'

type TokenStorage = {
    count: number
    refilledAt: number
}

/**
 * - Maintains a bucket of tokens for each unique key
 * - Automatically refills tokens over time
 * - Allows or denies actions based on token availability
 *
 * @param {number} max Maximum number of tokens a bucket can hold
 * @param {number} refillIntervalSeconds How often tokens are refilled
 * @returns {boolean} Allows or denies actions based on token availability
 */
export class RefillingTokenBucket<_Key> {
    private bucket = new Map<_Key, TokenStorage>()

    constructor(
        public name: string,
        public max: number,
        public refillIntervalSeconds: number,
    ) {
        logger.info(`[${this.name}] Initialization: max=${max} tokens, refill interval=${refillIntervalSeconds}s`)
    }

    private refillTokens(tokenStorage: TokenStorage): void {
        const now = Date.now()
        const elapsedIntervals = Math.floor((now - tokenStorage.refilledAt) / (this.refillIntervalSeconds * 1000))
        if (elapsedIntervals > 0) {
            tokenStorage.count = Math.min(tokenStorage.count + elapsedIntervals, this.max)
            tokenStorage.refilledAt = now
        }
    }

    public isAllowed(key: _Key, cost: number): boolean {
        const tokenStorage = this.bucket.get(key)
        if (!tokenStorage) {
            logger.info(`[${this.name}] New key "${key}" detected. Allowing initial action.`)
            return true
        }
        this.refillTokens(tokenStorage)
        logger.info(`[${this.name}] Key "${key}" checked. Tokens: ${tokenStorage.count}, Cost: ${cost}`)
        return tokenStorage.count >= cost
    }

    /**
     * @returns {boolean} a boolean, true if token is insufficient on consume
     */
    public consume(key: _Key, cost: number): boolean {
        let tokenStorage = this.bucket.get(key)

        if (!tokenStorage) {
            tokenStorage = { count: this.max, refilledAt: Date.now() }
            this.bucket.set(key, tokenStorage)
            logger.info(`[${this.name}] New key "${key}" registered.`)
        }

        this.refillTokens(tokenStorage)

        if (tokenStorage.count < cost) {
            logger.error(`[${this.name}] Insufficient tokens for key "${key}".`)
            return false
        }
        tokenStorage.count -= cost // Consume tokens
        logger.info(`[${this.name}] Key "${key}" allowed. Remaining tokens: ${tokenStorage.count}.`)
        return true
    }
}

export class Throttler<_Key> {
    public timeoutSeconds: number[]

    private storage = new Map<_Key, ThrottlingCounter>()

    constructor(timeoutSeconds: number[]) {
        this.timeoutSeconds = timeoutSeconds
    }

    public consume(key: _Key): { allowed: boolean; waitTime: number } {
        let counter = this.storage.get(key) ?? null
        const now = Date.now()
        if (counter === null) {
            // First request from the key
            counter = {
                timeout: 0,
                updatedAt: now,
            }
            this.storage.set(key, counter)
            return { allowed: true, waitTime: 0 }
        }

        const elapsed = now - counter.updatedAt
        const currentTimeoutInSeconds = this.timeoutSeconds[counter.timeout] * 1000

        if (elapsed < currentTimeoutInSeconds) {
            // Not allowed; calculate remaining wait time
            const waitTime = Math.ceil((currentTimeoutInSeconds - elapsed) / 1000) // Convert to seconds
            return { allowed: false, waitTime }
        }

        // Allowed; update the counter
        counter.updatedAt = now
        counter.timeout = Math.min(counter.timeout + 1, this.timeoutSeconds.length - 1) // Increment timeout level
        this.storage.set(key, counter)

        return { allowed: true, waitTime: 0 }
    }

    public reset(key: _Key): void {
        this.storage.delete(key)
    }
}

export class ExpiringTokenBucket<_Key> {
    public max: number
    public expiresInSeconds: number

    private storage = new Map<_Key, ExpiringBucket>()

    constructor(max: number, expiresInSeconds: number) {
        this.max = max
        this.expiresInSeconds = expiresInSeconds
    }

    public check(key: _Key, cost: number): boolean {
        const bucket = this.storage.get(key) ?? null
        const now = Date.now()
        if (bucket === null) {
            return true
        }
        if (now - bucket.createdAt >= this.expiresInSeconds * 1000) {
            return true
        }
        return bucket.count >= cost
    }

    public consume(key: _Key, cost: number): boolean {
        let bucket = this.storage.get(key) ?? null
        const now = Date.now()
        if (bucket === null) {
            bucket = {
                count: this.max - cost,
                createdAt: now,
            }
            this.storage.set(key, bucket)
            return true
        }
        if (now - bucket.createdAt >= this.expiresInSeconds * 1000) {
            bucket.count = this.max
        }
        if (bucket.count < cost) {
            return false
        }
        bucket.count -= cost
        this.storage.set(key, bucket)
        return true
    }

    public reset(key: _Key): void {
        this.storage.delete(key)
    }
}

interface ExpiringBucket {
    count: number
    createdAt: number
}

interface ThrottlingCounter {
    timeout: number
    updatedAt: number
}
