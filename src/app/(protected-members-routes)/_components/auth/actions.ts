'use server'

import { deleteSessionTokenCookie, getCurrentSession, invalidateSession } from '@/lib/auth'
import { globalPOSTRateLimit } from '../../lib/server/request'

export async function logoutAction(): Promise<{ success: boolean; message: string }> {
    console.log('clicekd!')
    if (!globalPOSTRateLimit()) {
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
    await new Promise((res) => setTimeout(res, 5000))
    await Promise.all([invalidateSession(session.id), deleteSessionTokenCookie()])
    return {
        success: true,
        message: 'Logout Successful',
    }
}
