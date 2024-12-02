'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from '@/i18n/routing'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { logoutAction } from './actions'

export default function LogoutButton() {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm()

    async function onCLick() {
        

        const res = await logoutAction()
        if (res.success === false) {
            return toast({ variant: 'destructive', title: 'Oh noose!', description: res.message })
        }
        toast({ title: 'Hooray!', description: 'Logout Successful' })
        router.push('/sign-in')
    }

    return (
        <form onSubmit={form.handleSubmit(onCLick)}>
            <Button disabled={form.formState.isLoading} type="submit">
                {form.formState.isLoading ? <Loader2 className="shrink-0 animate-spin" size={18} /> : 'Sign out'}
            </Button>
        </form>
    )
}
