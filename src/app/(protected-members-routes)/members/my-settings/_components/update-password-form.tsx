'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/ui/loading-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updatePasswordAction } from '../action'
import { updatePasswordFormSchema } from '../validation'
import { useToast } from '@/hooks/use-toast'

export default function UpdatePasswordForm() {
    const { toast } = useToast()
    const [isJSEnabled, setIsJSEnabled] = useState(false)
    const [state, formAction, isPending] = useActionState(updatePasswordAction, {
        success: false,
        message: '',
    })

    const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
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
        if (state.success) {
            toast({ variant: 'successful', description: state.message })
            form.reset()
        }
        /**
         * disable eslint, since it forces me to include the whole form object to the useEffect depedency..
         * But I only want to pass the reset method since it is what matters in this useEffect!
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, toast, form.reset])

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
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder={'********'} {...field} />
                            </FormControl>
                            <FormMessage />
                            <noscript>
                                <p className="text-destructive">{state?.issues?.currentPassword}</p>
                            </noscript>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder={'********'} {...field} />
                            </FormControl>
                            <FormMessage />
                            <noscript>
                                <p className="text-destructive">{state?.issues?.newPassword}</p>
                            </noscript>
                        </FormItem>
                    )}
                />
                <div className="h-[14px] pb-4">
                    <noscript>
                        {/* This will only render if JavaScript is disabled */}
                        <p className="text-destructive">{state.message}</p>
                    </noscript>
                    {isJSEnabled && state.success === false && (
                        <p ref={pRef} className="text-destructive">
                            {state.message}
                        </p>
                    )}
                </div>
                <LoadingButton className="mr-auto mt-4" loading={isPending}>
                    Update Password
                </LoadingButton>
            </form>
        </Form>
    )
}
