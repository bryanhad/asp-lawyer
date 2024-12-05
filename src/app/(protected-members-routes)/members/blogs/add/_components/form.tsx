'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/ui/loading-button'
import SkeletonFallback from '@/components/ui/tiptap/skeleton'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaClient } from '../../validation'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import { addBlogAction } from '../../action'
import { useRouter } from 'next/navigation'

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
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)

    const form = useForm<z.infer<typeof formSchemaClient>>({
        resolver: zodResolver(formSchemaClient),
        defaultValues: {
            title: '',
            content: '',
            thumbnail: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchemaClient>) {
        const res = await addBlogAction(values)
        toast({ variant: res.success ? 'successful' : 'destructive', description: res.message })
        if (res.success) {
            router.push('/members/blogs')
        }
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
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="relative grid h-32 w-32 min-w-32 place-content-center overflow-hidden rounded-lg border">
                        {!fileUrl && <ImageOff className="shrink-0 text-muted-foreground" size={90} />}
                        {fileUrl && (
                            <Image className="object-cover" alt={`New blog image`} src={fileUrl} fill priority />
                        )}
                    </div>
                    <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field: { onChange, ref, name } }) => (
                            <FormItem>
                                <FormLabel>Thumbnail</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={ref}
                                        name={name}
                                        onChange={(event) => {
                                            const files = event.target.files

                                            if (!files) return

                                            // Triggered when user uploaded a new file
                                            // FileList is immutable, so we need to create a new one
                                            const dataTransfer = new DataTransfer()

                                            // Add newly uploaded images
                                            Array.from(files).forEach((image) => dataTransfer.items.add(image))

                                            // Validate and update uploaded file
                                            const newFiles = dataTransfer.files
                                            onChange(newFiles)
                                            if (files[0]) {
                                                const url = URL.createObjectURL(files[0])
                                                setFileUrl(url)
                                            } else {
                                                if (fileUrl) {
                                                    URL.revokeObjectURL(fileUrl)
                                                }
                                                setFileUrl(undefined)
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
