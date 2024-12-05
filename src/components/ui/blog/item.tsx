import Image from 'next/image'
import UserInfo from '../user/info'
import { Blog, User } from '@prisma/client'
import { Link } from '@/i18n/routing'

export type Props = Pick<Blog, 'id' | 'title' | 'createdAt' | 'imageUrl'> & {
    author?: Pick<User, 'username'>
}

export default function BlogItem({ ...blog }: Props) {
    return (
        <div key={blog.id} className="flex flex-col overflow-hidden rounded-md border shadow-md">
            <Link
                href={`/members/blogs/${blog.id}`}
                className="relative h-[200px] overflow-hidden bg-secondary dark:brightness-90"
            >
                <Image
                    className="object-contain object-center"
                    src={blog.imageUrl}
                    fill
                    alt={`Thumbnail of blog ${blog.title}`}
                />
            </Link>
            <div className="flex-[1] p-3">
                <h3 className="mb-2 text-xl">{blog.title}</h3>
                <div className="flex gap-4">
                    {blog.author && <UserInfo username={blog.author.username} />}
                    <div className="text-sm text-muted-foreground">
                        <p>
                            {new Intl.DateTimeFormat('id-ID', {
                                weekday: 'long', // Full weekday name
                                day: '2-digit', // Two-digit day
                                month: 'long', // Full month name
                                year: 'numeric', // Four-digit year
                            }).format(blog.createdAt)}
                        </p>
                        <p>
                            {new Intl.DateTimeFormat('id-ID', {
                                hour: '2-digit', // Two-digit hour
                                minute: '2-digit', // Two-digit minute
                                hour12: true, // Use AM/PM format
                            }).format(blog.createdAt)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
