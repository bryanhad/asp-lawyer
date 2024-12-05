import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE_NAME, SESSION_EXPIRY } from './lib/auth'

const nextIntlMiddleware = createMiddleware(routing)

async function customMiddleware(req: NextRequest): Promise<NextResponse> {
    if (req.method === 'GET') {
        const res = NextResponse.next()
        const token = req.cookies.get(SESSION_COOKIE_NAME)?.value ?? null

        if (token !== null) {
            // Only extend cookie expiration on GET requests,
            // since we can be sure a new session wasn't set when handling this request.
            res.cookies.set(SESSION_COOKIE_NAME, token, {
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
     * @see https://lucia-auth.com/sessions/cookies/nextjs
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

export default async function middleware(req: NextRequest): Promise<NextResponse> {
    const pathname = req.nextUrl.pathname

    // Define the paths that should run `customMiddleware`
    const noInternationalizationPaths = ['/members', '/sign-in', '/sign-up']

    if (noInternationalizationPaths.some((path) => pathname.startsWith(path))) {
        console.log(pathname)
        return customMiddleware(req)
    }

    // const res = await customMiddleware(req)
    // if (res && res.status !== 200) {
    //     return res
    // }

    return nextIntlMiddleware(req)
}

export const config = {
    matcher: [
        // Match only internationalized pathnames
        // '/', '/(id|en)/:path*'

        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        '/((?!api|_next|_vercel|.*\\..*).*)',
    ],
}
