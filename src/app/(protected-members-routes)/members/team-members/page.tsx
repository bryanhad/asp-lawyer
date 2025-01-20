import LinkButton from '../../_components/link-button'
import { checkAuthorization } from '../../lib/server/utils'
import DisplayMembers from './_components/display-component'
import { MembersTableContextProvider } from './_components/table-context'

export default async function MembersPage() {
    const res = await checkAuthorization()
    if (res.tooManyRequest) {
        return res.message
    }

    return (
        <MembersTableContextProvider>
            <div className="flex justify-between gap-4">
                <LinkButton className="mb-4" href={'/members/members/add'}>
                    Add Members
                </LinkButton>
            </div>
            <DisplayMembers />
        </MembersTableContextProvider>
    )
}
