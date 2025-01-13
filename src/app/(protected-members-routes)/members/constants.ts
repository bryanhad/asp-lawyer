// to be used throughout the tanstack QueryClient
const BLOGS_QUERY_KEY = ['members-route', 'blogs']
const USERS_QUERY_KEY = ['members-route', 'users']

// to be used as search param to revalidate client cache
const REVALIDATE_CLIENT_CACHE = 'revalidate=true'

/**
 * the place holder username when the user is first created (status: NOT_VERIFIED)
 * OR user's status is ON_BOARDING
 */
export const PLACEHOLDER_USERNAME = 'PLACEHOLDER_USERNAME'

export {BLOGS_QUERY_KEY, REVALIDATE_CLIENT_CACHE, USERS_QUERY_KEY}