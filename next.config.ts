import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import withPlaiceholder from '@plaiceholder/next'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
    env: {
        basedir: process.cwd(),
    },
    /* config options here */
    // experimental: {
    //     staleTimes: {
    //         dynamic: 30,
    //     },
    // },
    images: {
        // overwrite nextjs's deviceSizes config with tailwind breakpoints
        deviceSizes: [640, 768, 1024, 1280],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: '*.bryanhadinata.com',
            },
            {
                // Matches any subdomain that starts with "asp-lawyer-" and ends with ".vercel.app"
                protocol: 'https',
                hostname: 'asp-lawyer-*.vercel.app',
            },
            {
                // uploadthing
                protocol: 'https',
                hostname: 'utfs.io',
                pathname: `/a/${process.env.UPLOADTHING_APP_ID}/*`,
            },
        ],
    },
}

export default withPlaiceholder(withNextIntl(nextConfig))
