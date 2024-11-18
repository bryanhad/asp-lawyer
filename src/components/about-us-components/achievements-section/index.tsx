import Section from '@/components/containers/section'
import SectionHeading from '@/components/ui/section-heading'
import dynamic from 'next/dynamic'
import { getAchievementsData } from './action'
import { getCurrentLocale } from '@/app/[locale]/layout'

const PinContainer = dynamic(() => import('./animated-pin'), {
    loading: () => <p>Loading..</p>,
})

type Props = { titleWhite: string; titlePrimary: string }

export default async function AchievementSection({
    titleWhite,
    titlePrimary,
}: Props) {
    const achievements = await getAchievementsData()
    const currentLocale = await getCurrentLocale()

    return (
        <Section>
            <SectionHeading
                oneLine
                titleTop={titleWhite}
                titleBottom={titlePrimary}
                flipText={currentLocale === 'id'}
            />
            <div className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                {achievements.map((a) => (
                    <PinContainer
                        key={a.id}
                        {...a}
                        currentLocale={currentLocale}
                    />
                ))}
            </div>
        </Section>
    )
}
