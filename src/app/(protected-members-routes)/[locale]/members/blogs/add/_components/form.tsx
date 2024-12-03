'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/ui/loading-button'
import SkeletonFallback from '@/components/ui/tiptap/skeleton'
import { useRouter } from '@/i18n/routing'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '../validation'
import { addBlogAction } from '../action'
import { useToast } from '@/hooks/use-toast'

const Tiptap = dynamic(() => import('@/components/ui/tiptap'), {
    loading: () => <SkeletonFallback />,
})

type Props = {
    titlePlaceholder: string
    contentPlaceholder: string
}

export function BlogForm({ titlePlaceholder, contentPlaceholder }: Props) {
    const router = useRouter()
    const { toast } = useToast()
    const [isTiptapLoaded, setIsTiptapLoaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await addBlogAction(values)
        toast({ variant: res.success ? 'successful' : 'destructive', description: res.message })
         router.push('/members/blogs')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder={titlePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blog Content</FormLabel>
                            <FormControl>
                                <Tiptap
                                    content={field.value}
                                    onChange={field.onChange}
                                    placeholder={contentPlaceholder}
                                    onReady={() => setIsTiptapLoaded(true)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton loading={form.formState.isSubmitting} disabled={!isTiptapLoaded}>
                    Add New Blog
                </LoadingButton>
            </form>
        </Form>
    )
}
