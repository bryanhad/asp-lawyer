'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/ui/loading-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from './validation'
import { forgotPasswordAction } from './action'

export default function ForgotPasswordForm() {
    const [isJSEnabled, setIsJSEnabled] = useState(false)
    const [state, formAction, isPending] = useActionState(forgotPasswordAction, {
        success: false,
        message: '',
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            /**
             * if the server sends the previous input fields,
             * override the current state of input fields in client side
             */
            ...(state.fields ?? {}),
        },
    })

    useEffect(() => {
        setIsJSEnabled(true)
        if (pRef.current && state.message) {
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
                        <p ref={pRef} className="text-center text-destructive">
                            {state.message}
                        </p>
                    )}
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder={'bambang@gmail.com'} {...field} />
                            </FormControl>
                            <FormMessage />
                            <noscript>
                                <p className="text-destructive">{state?.issues?.email}</p>
                            </noscript>
                        </FormItem>
                    )}
                />
                <LoadingButton className="mt-4 w-full" loading={isPending}>
                    Verify Email Address
                </LoadingButton>
            </form>
        </Form>
    )
}
