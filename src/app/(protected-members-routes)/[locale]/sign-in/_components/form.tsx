'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginAction } from '../actions'
import { formSchema } from '../validation'

export default function SignInForm() {
    const { toast } = useToast()

    const [state, formAction] = useActionState(loginAction, {
        message: '',
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            /**
             * if the server sends the previous input fields,
             * override the current state of input fields in client side
             */
            ...(state.fields ?? {}),
        },
    })

    const formRef = useRef<HTMLFormElement>(null)

    return (
        <Form {...form}>
            {!state.success && !state.issues && <p className="text-destructive">{state.message}</p>}
            {state?.issues && (
                <div className="text-destructive">
                    <ul className="space-y-1">
                        {state.issues.map((issue) => (
                            <li key={issue}>{issue}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form
                ref={formRef}
                action={formAction}
                onSubmit={form.handleSubmit(() => formRef.current?.submit())}
                className="space-y-4"
            >
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
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder={'******'} {...field} />
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
