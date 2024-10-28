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
}

export default withPlaiceholder(withNextIntl(nextConfig))
