import BLogList from '@/app/(public)/[locale]/blogs/_components/list'
import NoResult from '@/components/ui/no-result'
import prisma from '@/lib/prisma'
import BlogCard from './_components/card'
import { getCurrentLocale } from '../layout'

export default async function FetchComponent() {
    const blogs = await prisma.blog.findMany({
        select: {
            title: true,
            id: true,
            imageUrl: true,
            createdAt: true,
        },
    })
    const currentLocale = await getCurrentLocale()

    if (blogs.length < 1) return <NoResult title="No Blogs found" desc="Add a new blog" />

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {blogs.map((blog) => (
                <BlogCard currentLocale={currentLocale} key={blog.id} {...blog} />
            ))}
        </div>
    )
}
