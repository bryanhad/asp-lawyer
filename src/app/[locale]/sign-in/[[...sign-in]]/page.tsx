import { SignIn } from '@clerk/nextjs'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
    const t = await getTranslations('signinPage')
    return <SignIn 
    />
}
