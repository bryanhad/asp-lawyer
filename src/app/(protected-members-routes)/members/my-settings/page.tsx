import { getCurrentSession } from '@/app/(protected-members-routes)/lib/server/auth'
import { redirect } from 'next/navigation'
import { globalGETRateLimit } from '../../lib/server/request';

export default async function MySettingPage() {
	if (!globalGETRateLimit()) {
		return "Too many requests";
	}
	const { session, user } = await getCurrentSession();
	if (session === null) {
		return redirect("/sign-in");
	}

    return <div>MySettingPage</div>
}
