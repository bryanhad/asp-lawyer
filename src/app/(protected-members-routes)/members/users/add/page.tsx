import { checkAuthorization } from '@/app/(protected-members-routes)/lib/server/utils'
import AddUserForm from './form'

export default async function AddUserPage() {
    const res = await checkAuthorization()
    if (res.tooManyRequest) {
        return res.message
    }

    return <AddUserForm />
}
