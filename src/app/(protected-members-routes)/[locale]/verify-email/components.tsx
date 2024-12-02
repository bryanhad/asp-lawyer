'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { resendEmailVerificationCodeAction, verifyEmailAction } from './actions'
import { useToast } from '@/hooks/use-toast'
import { Locale } from '@/i18n/request'
import { useActionState } from 'react'
import { VerifyEmailFormData, verifyEmailFormSchema } from './validation'

type Props = {
    currentLocale: Locale
}

export function EmailVerificationForm({ currentLocale }: Props) {
    const { toast } = useToast()

    const form = useForm<VerifyEmailFormData>({
        resolver: zodResolver(verifyEmailFormSchema),
        defaultValues: {
            code: '',
        },
    })

    async function onVerifyEmailFormSubmit(values: VerifyEmailFormData) {
        const res = await verifyEmailAction(values, currentLocale)
        if (!res.success) {
            toast({ variant: 'destructive', title: 'Oh noose!', description: res.message })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onVerifyEmailFormSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input placeholder={'********'} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Sign In</Button>
            </form>
        </Form>
    )
}

const resendEmailInitialState = {
    success: false,
    message: '',
}

export function ResendEmailVerificationCodeForm() {
    const [state, action] = useActionState(resendEmailVerificationCodeAction, resendEmailInitialState)
    return (
        <form action={action}>
            <Button type="submit">Resend Code</Button>
            <p>{state.message}</p>
        </form>
    )
}
