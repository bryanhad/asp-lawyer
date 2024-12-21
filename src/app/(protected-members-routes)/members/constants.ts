// to be used throughout the tanstack QueryClient
const BLOGS_QUERY_KEY = ['members-route', 'blogs']
const USERS_QUERY_KEY = ['members-route', 'users']

// to be used as search param to revalidate client cache
const REVALIDATE_CLIENT_CACHE = 'revalidate=true'

export {BLOGS_QUERY_KEY, REVALIDATE_CLIENT_CACHE, USERS_QUERY_KEY}