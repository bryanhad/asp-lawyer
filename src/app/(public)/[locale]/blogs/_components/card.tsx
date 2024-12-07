import { Locale } from '@/i18n/request'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { BlogCardData } from '../action'

export type Props = BlogCardData & {
    currentLocale: Locale
}

export default function BlogCard({ currentLocale, ...blog }: Props) {
    return (
        <div key={blog.id} className="flex flex-col overflow-hidden rounded-md border shadow-md">
            <Link href={`/blogs/${blog.id}`} className="relative h-[200px] overflow-hidden bg-secondary">
                <Image
                    className="object-contain object-center dark:brightness-90"
                    src={blog.imageUrl}
                    fill
                    alt={`Thumbnail of blog ${blog.title.en}`}
                />
            </Link>
            <div className="flex flex-[1] flex-col p-3">
                <h3 className="mb-2 text-xl line-clamp-2">{currentLocale === 'en' ? blog.title.en : blog.title.id}</h3>
                <div className="mt-auto flex gap-4">
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
