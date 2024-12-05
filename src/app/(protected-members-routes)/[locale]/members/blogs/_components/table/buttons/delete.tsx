'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { useToast } from '@/hooks/use-toast'
import { Blog } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { deleteBlog } from '../action'

type Props = {
    blogTitle: Blog['title']
    blogId: Blog['id']
    small?: boolean
    variant?: ButtonProps['variant']
}

function DeleteBlogButton({
    blogTitle,
    blogId,
    small = false,
    variant='destructive'
}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { toast } = useToast()

    async function handleApproveDelete() {
        try {
            await deleteBlog(blogId)
            toast({
                title: `Successfully deleted blog '${blogTitle}'.`,
            })
        } catch (err: any) {
            toast({
                variant: 'destructive',
                title: 'Failed to delete blog.',
                description: err.message || 'Something went wrong.',
            })
        } finally {
            setIsModalOpen(false)
        }
    }

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
                    {small ? (
                        <Trash className="shrink-0" size={16} />
                    ) : (
                        'Delete'
                    )}
                </Button>
            }
            title={`Are you sure?`}
            desc={`Delete entry of '${blogTitle}'`}
        >
            <div className="flex gap-2 w-full">
                <Button
                    onClick={() => handleApproveDelete()}
                    className="flex-1"
                    variant={'destructive'}
                >
                    Yes, delete permanently
                </Button>
                <Button
                    className="flex-1"
                    variant={'outline'}
                    onClick={() => setIsModalOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteBlogButton
