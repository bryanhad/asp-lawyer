'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormData, formSchema } from './validation'
import { onBoardingAction } from './actions'
import { createRedirectUrl } from '../lib/client/utils'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {
    className?: string
}

export default function OnBoardingForm({ className }: Props) {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(values: FormData) {
        const res = await onBoardingAction(values)
        toast({ variant: res.success ? 'successful' : 'destructive', description: res.message })
        if (res?.redirect) {
            router.push(createRedirectUrl(res.redirect.path, { ...res.redirect.params }))
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder={'bambang'} type="text" {...field} />
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
                            <FormLabel>Your New Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder={'********'} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder={'********'} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full'>Set up your account</Button>
            </form>
        </Form>
    )
}
