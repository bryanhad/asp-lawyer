'use client'

import LoadingButton from '@/components/ui/loading-button'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from '@/i18n/routing'
import { startTransition, useActionState, useEffect, useRef } from 'react'
import { logoutAction } from './actions'

export default function LogoutButton() {
    const router = useRouter()
    const { toast } = useToast()
    const [state, formAction, isPending] = useActionState(logoutAction, { message: '' })

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.success) {
            toast({ description: state.message })
            router.push('/sign-in')
        }
    }, [state.success, state.message, toast, router])

    return (
        <form
            ref={formRef}
            action={formAction}
            onSubmit={() => {
                startTransition(() => formAction())
            }}
        >
            <LoadingButton loading={isPending}>Sign out</LoadingButton>
        </form>
    )
}
