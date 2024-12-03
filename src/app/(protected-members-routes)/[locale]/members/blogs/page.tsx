import LinkButton from '@/components/ui/link-button'
import prisma from '@/lib/prisma'
import { Suspense } from 'react'

export default async function BlogsPage() {
    const blogs = await prisma.blog.findMany()
    return (
        <div>
            <Suspense fallback={'Loading...'}>
                {blogs.length > 0 && (
                    <div className="space-y-2">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="border">
                                {JSON.stringify(blog)}
                            </div>
                        ))}
                    </div>
                )}
                {blogs.length < 1 && <p>No Blogs</p>}
            </Suspense>
            <LinkButton href={'/members/blogs/add'}>Add Blog</LinkButton>
        </div>
    )
}
