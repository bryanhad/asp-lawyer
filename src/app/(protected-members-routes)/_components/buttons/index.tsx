'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import LoadingButton from '@/components/ui/loading-button'
import Modal from '@/components/ui/modal'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Eye, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'

type DeleteButtonProps = {
    toBeDeletedName: string
    small?: boolean
    variant?: ButtonProps['variant']
    onApprove: <T>(id: T) => Promise<{ success: boolean; message: string }>
    className?: string
}

export function DeleteButton({
    toBeDeletedName,
    small = false,
    variant = 'destructive-outline',
    onApprove,
    className,
}: DeleteButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const [state, formAction, isPending] = useActionState(onApprove, {
        success: false,
        message: '',
    })

    useEffect(() => {
        console.log(state)
        if (state.message) {
            toast({ variant: state.success ? 'successful' : 'destructive', description: state.message })
            setIsModalOpen(false)
        }
        if (state.success) {
            router.refresh()
        }
    }, [state, toast, router])

    return (
        <Modal
            centerText
            className="items-center"
            open={isModalOpen}
            onOpenChange={async () => {
                if (isModalOpen) {
                    setIsModalOpen((prev) => !prev)
                }
            }}
            buttonCustom={
                <Button
                    variant={variant}
                    onClick={() => {
                        setIsModalOpen((prev) => !prev)
                    }}
                    className={cn(className)}
                >
                    {small ? <Trash className="shrink-0" size={16} /> : 'Delete'}
                </Button>
            }
            title={`Are you sure?`}
            desc={`Delete entry of '${toBeDeletedName}'`}
        >
            <div className="flex w-full gap-2">
                <form action={formAction}>
                    <LoadingButton loading={isPending} type="submit" className="flex-1" variant={'destructive'}>
                        Yes, delete permanently
                    </LoadingButton>
                </form>
                <Button className="flex-1" variant={'outline'} onClick={() => setIsModalOpen(false)}>
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

type ViewbuttonProps = {
    href: string
    small?: boolean
    variant?: ButtonProps['variant']
    className?: string
}

export function ViewButton({ href, small = false, variant = 'outline', className }: ViewbuttonProps) {
    return (
        <Button asChild variant={variant} className={cn(className)}>
            <Link href={href}>{small ? <Eye className="shrink-0" size={16} /> : 'View'}</Link>
        </Button>
    )
}

type EditButtonProps = {
    href: string
    small?: boolean
    variant?: ButtonProps['variant']
    className?: string
}

export function EditButton({ href, small = false, variant = 'outline', className }: EditButtonProps) {
    return (
        <Button
            asChild
            variant={variant}
            className={cn(
                'text-blue-400 hover:bg-blue-400 hover:text-white dark:text-blue-500 dark:hover:bg-blue-500',
                className,
            )}
        >
            <Link href={href}>{small ? <Pencil className="shrink-0" size={16} /> : 'Edit'}</Link>
        </Button>
    )
}
