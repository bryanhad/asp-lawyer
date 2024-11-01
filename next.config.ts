import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import withPlaiceholder from '@plaiceholder/next'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        staleTimes: {
            dynamic: 30,
        },
    },
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
            },
            {
                hostname: 'bryanhadinata.com',
            },
            {
                // Matches any domain that starts with "asp-lawyer-" and ends with ".vercel.app"
                protocol: 'https',
                hostname: 'asp-lawyer-*.*.vercel.app',
            },
        ],
    },
}

export default withPlaiceholder(withNextIntl(nextConfig))
