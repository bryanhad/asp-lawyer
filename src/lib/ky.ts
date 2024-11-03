import ky from 'ky'

const baseUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000' // Local development URL
        : process.env.NEXT_PUBLIC_API_BASE_URL; // Production URL set in Vercel

const kyInstance = ky.create({
    prefixUrl: baseUrl, // will resolve all relative URLs to the configured base URL
    parseJson(text) {
        return JSON.parse(text, (key, value) => {
            /**
             * turn the stringified date value into a Date instance
             * which is usually in a column name that ends with "At"
             */
            if (key.endsWith('At')) return new Date(value)
            return value
        })
    },
})

export default kyInstance
