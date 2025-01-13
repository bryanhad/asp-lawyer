import LinkButton from '@/app/(protected-members-routes)/_components/link-button'
import { checkAuthorization } from '../../lib/server/utils'
import DisplayBlogs from './_components/display-component'
import SearchBar from './_components/search-bar'
import { BlogsTableContextProvider } from './_components/table-context'

export default async function Page() {
    const res = await checkAuthorization()
    if (res.tooManyRequest) {
        return res.message
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
