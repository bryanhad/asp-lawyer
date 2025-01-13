'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import LoadingButton from '@/components/ui/loading-button'
import Modal from '@/components/ui/modal'
import { cn } from '@/lib/utils'
import { Eye, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type DeleteButtonProps = {
    toBeDeletedName: string
    small?: boolean
    variant?: ButtonProps['variant']
    onApprove: <T>(id: T) => unknown
    isPending: boolean
    isSuccessful: boolean
    className?: string
}

export function DeleteButton({
    toBeDeletedName,
    small = false,
    variant = 'destructive-outline',
    onApprove,
    isPending,
    isSuccessful,
    className,
}: DeleteButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (isSuccessful) {
            setIsModalOpen(false)
        }
    }, [isSuccessful])

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
                <LoadingButton
                    loading={isPending}
                    type="button"
                    onClick={onApprove}
                    className="flex-1"
                    variant={'destructive'}
                >
                    Yes, delete permanently
                </LoadingButton>
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
                'text-blue-400 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-500',
                className,
            )}
        >
            <Link href={href}>{small ? <Pencil className="shrink-0" size={16} /> : 'Edit'}</Link>
        </Button>
    )
}
