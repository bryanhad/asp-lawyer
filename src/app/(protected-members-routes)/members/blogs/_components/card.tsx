import Image from 'next/image'
import { deleteBlogAction, getData } from '../action'
import { DeleteButton, EditButton, ViewButton } from '@/app/(protected-members-routes)/_components/buttons'
import InputorInfo from './inputor-info'
import { cn } from '@/lib/utils'
import Flag from '@/components/ui/flag'

// get the type of single blog of the getData function
type Props = Awaited<ReturnType<typeof getData>>['blogs'][number] & {
    className?: string
}

function BlogCard({ className, ...blog }: Props) {
    return (
        <div className={cn('flex flex-col overflow-hidden rounded-md border', className)}>
            <div className="grid grid-cols-3 p-2">
                <div className="relative max-h-[150px] min-h-[120px] w-full overflow-hidden rounded-md bg-secondary">
                    <Image
                        className="object-cover object-center dark:brightness-90"
                        alt={`Thumbnail of blog '${blog.title}'`}
                        src={blog.imageUrl}
                        placeholder="blur"
                        blurDataURL={blog.blurImageUrl}
                        fill
                    />
                </div>
                <div className="col-span-2 ml-2 flex flex-col justify-between px-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                            <Flag round flag="en" />
                            <h3 className="line-clamp-1">{blog.title.en}</h3>
                        </div>
                        <div className="flex items-start gap-2">
                            <Flag round flag="id" />
                            <h3 className="line-clamp-1">{blog.title.id}</h3>
                        </div>
                    </div>
                    <div className="mt-4 space-y-1">
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
                    toBeDeletedName={blog.title.en}
                    onApprove={deleteBlogAction.bind(null, blog.id)}
                />
                <EditButton className="flex-[1]" small href={`/members/blogs/${blog.id}/edit`} />
                <ViewButton className="flex-[1]" small href={`/members/blogs/${blog.id}`} />
            </div>
        </div>
    )
}

export default BlogCard
