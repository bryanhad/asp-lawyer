'use server'

import { deleteSessionTokenCookie, getCurrentSession, invalidateSession } from '@/lib/auth'
import { globalPOSTRateLimit } from '../../lib/server/request'
import { getCurrentLocale, verifyLocale } from '@/lib/server-utils'
import { redirect } from '@/i18n/routing'

export type FormState = {
    success?: boolean
    message: string
}

export async function logoutAction(_prevState: FormState): Promise<FormState> {
    if (!globalPOSTRateLimit()) {
        return {
            success: false,
            message: 'Too many requests',
        }
    }

    const locale = await getCurrentLocale()
    const currentLocale = verifyLocale(locale)
    if (!currentLocale) {
        return {
            success: false,
            message: 'Missing locale',
        }
    }

    const { session } = await getCurrentSession()
    if (session === null) {
        return {
            success: false,
            message: 'Not authenticated',
        }
    }
    await Promise.all([invalidateSession(session.id), deleteSessionTokenCookie()])
    // Redirect to the sign-in page with a success query parameter
    return redirect({ href: `/sign-in?toast=${encodeURIComponent('Logout Successful')}`, locale: currentLocale })
}
