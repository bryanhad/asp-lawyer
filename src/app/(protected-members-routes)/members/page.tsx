import { capitalizeFirstLetter } from '@/lib/utils'
import { checkAuthorization } from '../lib/server/utils'

export default async function MemberPage() {
    const res = await checkAuthorization()
    if (res.tooManyRequest) {
        return res.message
    }

    return (
        <div className="">
            <h2 className="text-center text-xl leading-none sm:text-start">
                Welcome back,{' '}
                <span className="text-nowrap font-semibold text-primary">{capitalizeFirstLetter(res.user.username)}!</span>
            </h2>
        </div>
    )
}
