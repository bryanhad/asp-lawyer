export class RefillingTokenBucket<_Key> {
    public max: number
    public refillIntervalSeconds: number

    constructor(max: number, refillIntervalSeconds: number) {
        this.max = max
        this.refillIntervalSeconds = refillIntervalSeconds
    }

    private storage = new Map<_Key, RefillBucket>()

    public check(key: _Key, cost: number): boolean {
        const bucket = this.storage.get(key) ?? null
        if (bucket === null) {
            // console.log(`New Bucket for key "${key}". (max: ${this.max}).`)

            return true
        }
        const now = Date.now()
        const refill = Math.floor((now - bucket.refilledAt) / (this.refillIntervalSeconds * 1000))
        const availableTokens = Math.min(bucket.count + refill, this.max)

        // console.log(`Bucket for key "${key}" has ${availableTokens} tokens available.`)

        if (refill > 0) {
            return availableTokens >= cost
        }
        return bucket.count >= cost
    }

    public consume(key: _Key, cost: number): boolean {
        // logger.info(`Consume called for key "${key}". Current bucket:`, this.storage.get(key))

        let bucket = this.storage.get(key) ?? null
        const now = Date.now()
        if (bucket === null) {
            // Create a new bucket if it doesn't exist
            bucket = {
                count: this.max - cost, // Initialize with tokens reduced by cost
                refilledAt: now,
            }
            this.storage.set(key, bucket)
            return true
        }

        // Calculate the number of tokens to refill
        const refill = Math.floor((now - bucket.refilledAt) / (this.refillIntervalSeconds * 1000))
        bucket.count = Math.min(bucket.count + refill, this.max)
        bucket.refilledAt = now

        if (bucket.count < cost) {
            return false // Not enough tokens
        }
        bucket.count -= cost // Consume tokens
        this.storage.set(key, bucket) // Update storage with the modified bucket
        
        // logger.info(`After consume: "${key}" bucket:`, this.storage.get(key))

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

interface RefillBucket {
    count: number
    refilledAt: number
}

interface ExpiringBucket {
    count: number
    createdAt: number
}

interface ThrottlingCounter {
    timeout: number
    updatedAt: number
}
