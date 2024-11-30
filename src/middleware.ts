import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, SESSION_EXPIRY } from './lib/auth'

const nextIntlMiddleware = createMiddleware(routing)

async function customMiddleware(req: NextRequest): Promise<NextResponse> {
    if (req.method === 'GET') {
        const res = NextResponse.next()
        const token = req.cookies.get(COOKIE_NAME)?.value ?? null

        if (token !== null) {
            // Only extend cookie expiration on GET requests,
            // since we can be sure a new session wasn't set when handling this request.
            res.cookies.set(COOKIE_NAME, token, {
                path: '/',
                maxAge: SESSION_EXPIRY,
                sameSite: 'lax',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            })
        }

        return res
    }

    /**
     * CSRF PROTECTION
     *
     * Refer to lucia's documentation:
     * https://lucia-auth.com/sessions/cookies/nextjs
     */
    const originHeader = req.headers.get('Origin')
    const hostHeader = req.headers.get('Host')

    // NOTE: You may need to use `X-Forwarded-Host` instead
    if (originHeader === null || hostHeader === null) {
        console.log('CSRF check failed: Missing headers', {
            originHeader,
            hostHeader,
        })
        return new NextResponse(null, {
            status: 403,
        })
    }

    let origin: URL
    try {
        origin = new URL(originHeader)
    } catch (_err) {
        return new NextResponse(null, {
            status: 403,
        })
    }
    if (origin.host !== hostHeader) {
        console.log('CSRF check failed: Origin and Host mismatch', {
            origin: origin.host,
            host: hostHeader,
        })
        return new NextResponse(null, {
            status: 403,
        })
    }
    return NextResponse.next()
}

export default async function middleware(
    req: NextRequest,
): Promise<NextResponse> {
    const res = await customMiddleware(req)
    if (res && res.status !== 200) {
        return res
    }
    return nextIntlMiddleware(req)
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(id|en)/:path*'],
}
