'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import LoadingButton from '@/components/ui/loading-button'
import Modal from '@/components/ui/modal'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from '@/i18n/routing'
import { Trash } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'

type Props = {
    toBeDeletedName: string
    small?: boolean
    variant?: ButtonProps['variant']
    onApprove: <T>(id: T) => Promise<{ success: boolean; message: string }>
}

export default function DeleteButton({ toBeDeletedName, small = false, variant = 'destructive', onApprove }: Props) {
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
