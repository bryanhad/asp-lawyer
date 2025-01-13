import LinkButton from '../../_components/link-button'
import { checkAuthorization } from '../../lib/server/utils'
import DisplayUsers from './_components/display-component'
import { UsersTableContextProvider } from './_components/table-context'

export default async function UsersPage() {
    const res = await checkAuthorization()
    if (res.tooManyRequest) {
        return res.message
    }

    return (
        <UsersTableContextProvider>
            <div className="flex justify-between gap-4">
                <LinkButton className="mb-4" href={'/members/users/add'}>
                    Add Users
                </LinkButton>
            </div>
            <DisplayUsers />
        </UsersTableContextProvider>
    )
}
