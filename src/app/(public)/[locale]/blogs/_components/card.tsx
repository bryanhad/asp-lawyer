import ImageWithFallbackPlaceholder from '@/components/ui/image-with-fallback-placeholder'
import { Locale } from '@/i18n/request'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { BlogCardData } from '../action'

export type Props = BlogCardData & {
    currentLocale: Locale
}

export default function BlogCard({ currentLocale, ...blog }: Props) {
    return (
        <div key={blog.id} className="flex flex-col overflow-hidden rounded-md border shadow-md">
            <Link href={`/blogs/${blog.id}`} className="group">
                <div
                    className={cn('relative h-[200px] overflow-hidden bg-secondary', {
                        border: blog.blurImageUrl === null,
                    })}
                >
                    <ImageWithFallbackPlaceholder
                        variant="absolute-center"
                        className="object-cover object-center duration-300 group-hover:scale-[1.02] dark:brightness-90"
                        src={blog.imageUrl}
                        placeholder="blur"
                        blurDataURL={blog.blurImageUrl}
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
                                {currentLocale === 'en' ? 'See More' : 'Selengkapnya'}
                            </p>
                            <ChevronRight className="shrink-0 text-primary" size={20} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
