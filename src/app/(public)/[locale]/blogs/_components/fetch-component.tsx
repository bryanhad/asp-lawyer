import prisma from '@/lib/prisma'

export default async function FetchComponent() {
    const blogs = await prisma.blog.findMany()

    return (
        <>
            {blogs.length > 0 && (
                <div className="space-y-2">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="border">
                            {blog.title}
                        </div>
                    ))}
                </div>
            )}
            {blogs.length < 1 && <p>No Blogs</p>}
        </>
    )
}
