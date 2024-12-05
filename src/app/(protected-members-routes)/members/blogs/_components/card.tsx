import Image from 'next/image'
import { deleteBlogAction, getData } from '../action'
import { DeleteButton, EditButton, ViewButton } from '@/app/(protected-members-routes)/_components/buttons'
import InputorInfo from './inputor-info'
import { cn } from '@/lib/utils'

// get the type of single blog of the getData function
type Props = Awaited<ReturnType<typeof getData>>['blogs'][number] & {
    className?: string
}

function BlogCard({ className, ...blog }: Props) {
    return (
        <div className={cn('flex flex-col overflow-hidden rounded-md border', className)}>
            <div className="grid grid-cols-2 p-2 sm:grid-cols-3">
                <div className="relative max-h-[150px] min-h-[120px] w-full overflow-hidden rounded-md bg-secondary">
                    <Image
                        className="object-cover object-center dark:brightness-90"
                        alt={`Thumbnail of blog '${blog.title}'`}
                        src={blog.imageUrl}
                        fill
                    />
                </div>
                <div className="ml-2 flex flex-col justify-between px-2 sm:col-span-2">
                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{blog.title}</h3>
                    <div className="space-y-2">
                        <p className="text-xs font-light text-muted-foreground">Created By</p>
                        <InputorInfo
                            authorId={blog.author.id}
                            authorName={blog.author.username}
                            inputedAt={blog.createdAt}
                            noIcon
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 p-2">
                <DeleteButton
                    className="flex-[1]"
                    small
                    toBeDeletedName={blog.title}
                    onApprove={deleteBlogAction.bind(null, blog.id)}
                />
                <EditButton className="flex-[1]" small href={`/members/blogs/${blog.id}`} />
                <ViewButton className="flex-[1]" small href={`/members/blogs/${blog.id}`} />
            </div>
        </div>
    )
}

export default BlogCard
