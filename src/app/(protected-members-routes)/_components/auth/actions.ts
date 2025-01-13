'use server'

import {
    deleteSessionTokenCookie,
    getCurrentSession,
    invalidateSession,
} from '@/app/(protected-members-routes)/lib/server/auth'
import { globalPOSTRateLimit } from '../../lib/server/request'
import { redirect } from 'next/navigation'
import { getClientIP } from '../../lib/server/utils'

export type FormState = {
    success?: boolean
    message: string
}

export async function logoutAction(_prevState: FormState): Promise<FormState> {
    const clientIP = await getClientIP()
    
    if (!globalPOSTRateLimit(clientIP)) {
        return {
            success: false,
            message: 'Too many requests',
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
    return redirect(`/sign-in?toast=${encodeURIComponent('Logout Successful')}`)
}
