import NoResult from '@/components/ui/no-result'
import { getCurrentLocale } from '../layout'
import BlogCard from './_components/card'
import { getData } from './action'

export default async function FetchComponent() {
    // await new Promise((res) => setTimeout(res, 500000000))
    const blogs = await getData()
    const currentLocale = await getCurrentLocale()

    if (blogs.length < 1) return <NoResult title="No Blogs found" desc="Add a new blog" />

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
                <BlogCard currentLocale={currentLocale} key={blog.id} {...blog} />
            ))}
        </div>
    )
}
