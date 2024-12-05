import Image from 'next/image'
import UserInfo from '../../../../../components/ui/user/info'
import { Blog, User } from '@prisma/client'
import { Link } from '@/i18n/routing'
import { Locale } from '@/i18n/request'

export type Props = Pick<Blog, 'id' | 'title' | 'createdAt' | 'imageUrl'> & {
    author?: Pick<User, 'username'>
    currentLocale: Locale
}

export default function BlogCard({ currentLocale, ...blog }: Props) {
    return (
        <div key={blog.id} className="flex flex-col overflow-hidden rounded-md border shadow-md">
            <Link href={`/members/blogs/${blog.id}`} className="relative h-[200px] overflow-hidden bg-secondary">
                <Image
                    className="object-contain object-center dark:brightness-90"
                    src={blog.imageUrl}
                    fill
                    alt={`Thumbnail of blog ${blog.title}`}
                />
            </Link>
            <div className="flex flex-[1] flex-col p-3">
                <h3 className="mb-2 text-xl">{blog.title}</h3>
                <div className="mt-auto flex gap-4">
                    {blog.author && <UserInfo username={blog.author.username} />}
                    <div className="text-sm text-muted-foreground">
                        <p>
                            {new Intl.DateTimeFormat(currentLocale === 'en' ? 'en-US' : 'id-ID', {
                                // weekday: 'short', // Full weekday name
                                day: '2-digit', // Two-digit day
                                month: 'long', // Full month name
                                year: 'numeric', // Four-digit year
                            }).format(blog.createdAt)}
                        </p>
                        {/* <p>
                            {new Intl.DateTimeFormat(currentLocale === 'en' ? 'en-US' : 'id-ID', {
                                hour: '2-digit', // Two-digit hour
                                minute: '2-digit', // Two-digit minute
                                hour12: currentLocale === 'en' ? true : false, // Use AM/PM format
                            }).format(blog.createdAt)}
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
