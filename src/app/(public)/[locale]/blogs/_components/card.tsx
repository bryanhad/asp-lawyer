import { Locale } from '@/i18n/request'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { BlogCardData } from '../action'
import { ChevronRight } from 'lucide-react'

export type Props = BlogCardData & {
    currentLocale: Locale
}

export default function BlogCard({ currentLocale, ...blog }: Props) {
    return (
        <div key={blog.id} className="flex flex-col overflow-hidden rounded-md border shadow-md">
            <Link href={`/blogs/${blog.id}`} className='group'>
                <div className="relative h-[200px] overflow-hidden bg-secondary">
                    <Image
                        className="object-cover object-center dark:brightness-90 group-hover:scale-[1.02] duration-300"
                        src={blog.imageUrl}
                        fill
                        alt={`Thumbnail of blog ${blog.title.en}`}
                    />
                </div>

                <div className="flex flex-[1] flex-col p-5 dark:bg-secondary">
                    <h3 className="mb-2 line-clamp-2 text-xl font-bold lg:text-2xl">
                        {currentLocale === 'en' ? blog.title.en : blog.title.id}
                    </h3>
                    <div className="mt-auto flex justify-between gap-3">
                        <p className="text-sm text-muted-foreground lg:text-base">
                            {new Intl.DateTimeFormat(currentLocale === 'en' ? 'en-US' : 'id-ID', {
                                // weekday: 'short', // Full weekday name
                                day: '2-digit', // Two-digit day
                                month: 'long', // Full month name
                                year: 'numeric', // Four-digit year
                            }).format(blog.createdAt)}
                        </p>
                        <div className="flex items-center">
                            <p className="text-sm text-primary">
                                {currentLocale === 'en' ? 'See More' : 'Baca Sselengkapnya'}
                            </p>
                            <ChevronRight className="shrink-0 text-primary" size={20} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
