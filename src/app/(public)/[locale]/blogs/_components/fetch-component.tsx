import BLogList from '@/components/ui/blog/list'
import NoResult from '@/components/ui/no-result'
import prisma from '@/lib/prisma'

export default async function FetchComponent() {
    const blogs = await prisma.blog.findMany({
        select: {
            title: true,
            id: true,
            imageUrl: true,
            createdAt: true,
        },
    })
    return (
        <>
            {blogs.length > 0 && <BLogList blogs={blogs} />}
            {blogs.length < 1 && <NoResult title="No Blogs found" desc="Add a new blog" />}
        </>
    )
}
