import BlogCard, { Props as BlogCardProps } from './card'

type Props = {
    blogs: BlogCardProps[]
}

export default function BLogList({ blogs }: Props) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {blogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
            ))}
        </div>
    )
}
