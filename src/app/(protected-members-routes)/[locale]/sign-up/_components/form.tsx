'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signupAction } from '../actions'
import { Locale } from '@/i18n/request'
import { useToast } from '@/hooks/use-toast'
import { FormData, formSchema } from '../validation'

type Props = {
    currentLocale: Locale
}

export default function SignUpForm({ currentLocale }: Props) {
    const { toast } = useToast()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: FormData) {
        const res = await signupAction(values, currentLocale)
        if (!res.success) {
            toast({ variant: 'destructive', title: 'Oh noose!', description: res.message })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder={'Bambang Ganteng'} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <Button type="submit">Sign Up</Button>
            </form>
        </Form>
    )
}
