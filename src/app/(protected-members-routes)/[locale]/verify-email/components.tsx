'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/ui/loading-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { resendEmailVerificationCodeAction, verifyEmailAction } from './actions'
import { formSchema } from './validation'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export function VerifyEmailForms() {
    const [isJSEnabled, setIsJSEnabled] = useState(false)

    useEffect(() => {
        setIsJSEnabled(true)
    }, [])

    return (
        <div className="space-y-2">
            <EmailVerificationForm isJSEnabled={isJSEnabled} />
            <ResendEmailVerificationCodeForm />
        </div>
    )
}

export function EmailVerificationForm({ isJSEnabled }: { isJSEnabled: boolean }) {
    const [state, formAction, isPending] = useActionState(verifyEmailAction, {
        message: '',
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: '',
            /**
             * if the server sends the previous input fields,
             * override the current state of input fields in client side
             */
            ...(state.fields ?? {}),
        },
    })

    useEffect(() => {
        if (pRef.current && state.message && !state.success) {
            pRef.current.classList.remove('wiggle')
            void pRef.current.offsetWidth // force refloe of element (ensure  browser processes the removal and re-addition of the class.)
            pRef.current.classList.add('wiggle')
        }
    }, [state])

    const formRef = useRef<HTMLFormElement>(null)
    const pRef = useRef<HTMLParagraphElement>(null)

    return (
        <Form {...form}>
            <form
                ref={formRef}
                action={formAction}
                onSubmit={form.handleSubmit(() => {
                    /**
                     * have to use startTransition cuz React will shout if we call the formAction outisde the 'action' context
                     * ps: 'action' in this case is the action prop of the form tag
                     */
                    startTransition(() => {
                        // Pass data directly to the action
                        formAction(new FormData(formRef.current!))
                    })
                })}
                className="flex flex-col gap-4"
            >
                <div className="h-[14px]">
                    <noscript>
                        {/* This will only render if JavaScript is disabled */}
                        <p className="text-center text-destructive">{state.message}</p>
                    </noscript>
                    {isJSEnabled && (
                        <p
                            ref={pRef}
                            className={cn(
                                'text-center',
                                state.success === true ? 'text-successful' : 'text-destructive',
                            )}
                        >
                            {state.message}
                        </p>
                    )}
                </div>{' '}
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input placeholder={'12345678'} {...field} />
                            </FormControl>
                            <FormMessage />
                            <noscript>
                                <p className="text-destructive">{state?.issues?.code}</p>
                            </noscript>
                        </FormItem>
                    )}
                />
                <LoadingButton className="mt-4 w-full" loading={isPending}>
                    Verify
                </LoadingButton>
            </form>
        </Form>
    )
}

export function ResendEmailVerificationCodeForm() {
    const { toast } = useToast()
    const [state, formAction, isPending] = useActionState(resendEmailVerificationCodeAction, { message: '' })

    // notify form message via toast if there is JS enabled
    useEffect(() => {
        if (state.message) {
            toast({ variant: state.success ? 'successful' : 'destructive', description: state.message })
        }
    }, [state, toast])

    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={formRef}
            action={formAction}
            onSubmit={(e) => {
                e.preventDefault()
                /**
                 * have to use startTransition cuz React will shout if we call the formAction outisde the 'action' context
                 * ps: 'action' in this case is the action prop of the form tag
                 */
                startTransition(() => {
                    // Pass data directly to the action
                    formAction()
                })
            }}
            className="flex flex-col gap-4"
        >
            <LoadingButton loading={isPending}>Resend Code</LoadingButton>
            <noscript>
                {/* This will only render if JavaScript is disabled */}
                <p className="text-center text-destructive">{state.message}</p>
            </noscript>
        </form>
    )
}
