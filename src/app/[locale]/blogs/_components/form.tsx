'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Section from '@/components/containers/section'
import SectionHeading from '@/components/ui/section-heading'
import dynamic from 'next/dynamic'
import SkeletonFallback from '@/components/ui/tiptap/skeleton'

const Tiptap = dynamic(() => import('@/components/ui/tiptap'), {
    loading: () => <SkeletonFallback />,
    ssr: false,
})

const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 5 characters.',
    }),
    content: z.string().min(10, {
        message: 'content must be at least 10 characters.',
    }),
})

type Props = {
    titleWhite: string
    titlePrimary: string
    titlePlaceholder: string
    contentPlaceholder: string
}

export function BlogForm({
    titleWhite,
    titlePrimary,
    titlePlaceholder,
    contentPlaceholder,
}: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Section lessYSpacing>
            <SectionHeading
                titleTop={titleWhite}
                titleBottom={titlePrimary}
                oneLine
            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={titlePlaceholder}
                                        {...field}
                                    />
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
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Section>
    )
}
