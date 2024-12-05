import BlogItem, { Props as BlogItemProps } from './item'

type Props = {
    blogs: BlogItemProps[]
}

export default function BLogList({ blogs }: Props) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {blogs.map((blog) => (
                <BlogItem key={blog.id} {...blog} />
            ))}
        </div>
    )
}
