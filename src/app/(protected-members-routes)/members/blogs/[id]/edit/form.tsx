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
import { editBlogFormSchemaClient } from '../../validation'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import Flag from '@/components/ui/flag'
import { cn } from '@/lib/utils'

const Tiptap = dynamic(() => import('@/components/ui/tiptap'), {
    loading: () => <SkeletonFallback />,
})

type Props = {
    onSubmit: (data: any) => Promise<{ success: boolean; message: string }>
    devaultValues?: Omit<z.infer<typeof editBlogFormSchemaClient>, 'thumbnail'> & { imageUrl: string }
}

export default function EditBlogForm({ devaultValues, onSubmit }: Props) {
    const { toast } = useToast()
    const [isTiptapLoaded, setIsTiptapLoaded] = useState(false)
    const [fileUrl, setFileUrl] = useState<string | undefined>(devaultValues?.imageUrl ?? undefined)

    const { imageUrl: _unUsed1, ...fetchedDevaultValues } = devaultValues ?? {}

    const form = useForm<z.infer<typeof editBlogFormSchemaClient>>({
        resolver: zodResolver(editBlogFormSchemaClient),
        defaultValues: {
            titleEN: '',
            titleID: '',
            contentEN: '',
            contentID: '',
            thumbnail: undefined,
            ...fetchedDevaultValues,
        },
    })

    async function onFormSubmit(values: z.infer<typeof editBlogFormSchemaClient>) {
        const res = await onSubmit(values)
        toast({ variant: res.success ? 'successful' : 'destructive', description: res.message })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                    <FormField
                        control={form.control}
                        name="titleID"
                        render={({ field }) => (
                            <FormItem className="flex-[1]">
                                <div className="flex items-center gap-2">
                                    <Flag flag="id" round />
                                    <FormLabel>Title</FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        disabled={form.formState.isSubmitting}
                                        placeholder={`Masukkan judul blog anda (contoh: '5 Elemen Penting dalam Hukum Kontrak')`}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="titleEN"
                        render={({ field }) => (
                            <FormItem className="flex-[1]">
                                <div className="flex items-center gap-2">
                                    <Flag flag="en" round />
                                    <FormLabel>Title</FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        disabled={form.formState.isSubmitting}
                                        placeholder={`Enter your blog title (e.g., '5 Key Elements of Contract Law')`}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                                    {/* Style the label as a custom file input placeholder */}
                                    <div>
                                        <label
                                            htmlFor="thumbnail"
                                            tabIndex={0} // Makes the label focusable
                                            className={cn(
                                                'block cursor-pointer select-none rounded-md border border-input px-6 py-2 text-muted-foreground',
                                                {
                                                    'cursor-not-allowed opacity-50': form.formState.isSubmitting,
                                                },
                                            )}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault()
                                                    document.getElementById('thumbnail')?.click()
                                                }
                                            }}
                                        >
                                            {fileUrl ? 'Change Image' : 'No file chosen'}
                                        </label>
                                        <Input
                                            disabled={form.formState.isSubmitting}
                                            id="thumbnail"
                                            type="file"
                                            accept="image/*"
                                            ref={ref}
                                            name={name}
                                            className="hidden"
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
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="contentID"
                    render={({ field }) => (
                        <FormItem className="flex-[1]">
                            <div className="flex items-center gap-2">
                                <Flag flag="id" round />
                                <FormLabel>Blog Content</FormLabel>
                            </div>
                            <FormControl>
                                <Tiptap
                                    disabled={form.formState.isSubmitting}
                                    content={field.value}
                                    onChange={field.onChange}
                                    placeholder={`Bagikan wawasan Anda tentang topik ini secara rinci`}
                                    onReady={() => setIsTiptapLoaded(true)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contentEN"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-2">
                                <Flag flag="en" round />
                                <FormLabel>Blog Content</FormLabel>
                            </div>
                            <FormControl>
                                <Tiptap
                                    disabled={form.formState.isSubmitting}
                                    content={field.value}
                                    onChange={field.onChange}
                                    placeholder={`Share your insights on the topic in detail`}
                                    onReady={() => setIsTiptapLoaded(true)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    loading={form.formState.isSubmitting}
                    disabled={!isTiptapLoaded || !form.formState.isDirty}
                >
                    Update Blog
                </LoadingButton>
            </form>
        </Form>
    )
}
