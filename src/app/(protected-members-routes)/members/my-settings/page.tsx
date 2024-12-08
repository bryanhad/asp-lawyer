import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'
import { globalGETRateLimit } from '../../lib/server/request'
import SettingsFormWrapper from './_components/settings-form-wrapper'
import UpdateEmailForm from './_components/update-email-form'
import UpdatePasswordForm from './_components/update-password-form'
import { Mail } from 'lucide-react'

export default async function MySettingPage() {
    if (!globalGETRateLimit()) {
        return 'Too many requests'
    }
    const { session, user } = await getCurrentSession()
    if (session === null) {
        return redirect('/sign-in')
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <SettingsFormWrapper
                header={
                    <>
                        <h2 className="font-semibold">Update Email</h2>
                        <p className="flex flex-col gap-2">
                            <span>Current email:</span>
                            <span className='flex gap-2 items-center'>
                                <Mail className="shrink-0" size={18} />
                                <span className="flex max-w-max items-center gap-1 rounded-md bg-stone-200 px-2 py-1 dark:bg-zinc-700">
                                    {user.email}
                                </span>
                            </span>
                        </p>
                    </>
                }
            >
                <UpdateEmailForm />
            </SettingsFormWrapper>
            <SettingsFormWrapper header={<h2 className="font-semibold">Update Password</h2>}>
                <UpdatePasswordForm />
            </SettingsFormWrapper>
        </div>
    )
}
