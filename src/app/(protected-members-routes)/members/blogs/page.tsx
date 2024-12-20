import LinkButton from '@/app/(protected-members-routes)/_components/link-button'
import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'
import DisplayBlogs from './_components/display-component'
import SearchBar from './_components/search-bar'
import { BlogsTableContextProvider } from './_components/table-context'

export default async function Page() {
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }
    if (!user.emailIsVerified) {
        return redirect('/verify-email')
    }

    return (
        <BlogsTableContextProvider>
            <div className="flex justify-between gap-4">
                <LinkButton className="mb-4" href={'/members/blogs/add'}>
                    Add Blog
                </LinkButton>
                <SearchBar />
            </div>
            <DisplayBlogs />
        </BlogsTableContextProvider>
    )
}
