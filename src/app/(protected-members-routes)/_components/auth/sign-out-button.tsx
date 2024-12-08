'use client'

import LoadingButton from '@/components/ui/loading-button'
import { useToast } from '@/hooks/use-toast'
import { startTransition, useActionState, useEffect, useRef } from 'react'
import { logoutAction } from './actions'

export default function SignOutButton() {
    const { toast } = useToast()
    const [state, formAction, isPending] = useActionState(logoutAction, { message: '' })

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.message) {
            toast({ description: state.message, variant: 'destructive' })
        }
    }, [state, toast])

    return (
        <form
            ref={formRef}
            action={formAction}
            onSubmit={() => {
                startTransition(() => formAction())
            }}
        >
            <LoadingButton variant={'ghost'} loading={isPending}>Sign out</LoadingButton>
        </form>
    )
}
