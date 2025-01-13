import { checkAuthorization } from '@/app/(protected-members-routes)/lib/server/utils'
import AddBlogForm from './form'

export default async function AddBlogPage() {
    const res = await checkAuthorization()
    if (res.tooManyRequest) {
        return res.message
    }

    return <AddBlogForm />
}
