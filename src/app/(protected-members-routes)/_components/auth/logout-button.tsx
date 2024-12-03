'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { startTransition, useActionState, useEffect, useRef } from 'react'
import { logoutAction } from './actions'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from '@/i18n/routing'

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
            <Button disabled={isPending} type="submit">
                {isPending ? <Loader2 className="shrink-0 animate-spin" size={18} /> : 'Sign out'}
            </Button>
        </form>
    )
}
