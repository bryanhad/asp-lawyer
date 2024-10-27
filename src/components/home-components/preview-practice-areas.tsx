import { getTranslations } from 'next-intl/server'
import { SectionContainer } from '../ui/containers'
import LinkButton from '../ui/link-button'
import { ReactNode } from 'react'
import { Link } from '@/i18n/routing'
import { PiggyBank, Scale, FileText } from 'lucide-react'

export default async function PreviewPracticeAreas() {
    const t = await getTranslations('homePage.previewPracticeAreas')
    const tCommon = await getTranslations('commonWords')

    return (
        <div className="flex w-full flex-col items-center bg-gray-50">
            <SectionContainer title={t('title')} desc={<p>{t('desc')}</p>}>
                <div className="mb-12 grid w-full max-w-[1800px] grid-cols-1 gap-8 md:grid-cols-3">
                    <PracticeAreaCard
                        icon={<Scale size={48} />}
                        title={t('topPracticeAreas.litigation.title')}
                        desc={t('topPracticeAreas.litigation.shortDesc')}
                        imagePath="/home-page/practice-bankruptcy.jpg"
                        href="/practice-areas/litigation"
                        linkText={tCommon('learnMore')}
                    />
                    <PracticeAreaCard
                        icon={<PiggyBank size={48} className="shrink-0" />}
                        title={t('topPracticeAreas.bankruptcyLaw.title')}
                        desc={t('topPracticeAreas.bankruptcyLaw.shortDesc')}
                        imagePath="/home-page/practice-copyright.jpg"
                        href="/practice-areas/bankruptcy"
                        linkText={tCommon('learnMore')}
                    />
                    <PracticeAreaCard
                        icon={<FileText size={48} />}
                        title={t('topPracticeAreas.copyright.title')}
                        desc={t('topPracticeAreas.copyright.shortDesc')}
                        imagePath="/home-page/practice-litigation.jpg"
                        href="/practice-areas/copyright"
                        linkText={tCommon('learnMore')}
                    />
                </div>

                <LinkButton variant={'outline-accent'} href={'/about-us'}>
                    {t('callToAction')}
                </LinkButton>
            </SectionContainer>
        </div>
    )
}

type PracticeAreaCardProps = {
    icon: ReactNode
    title: string
    imagePath: string
    desc: string
    href: string
    linkText: string
}

function PracticeAreaCard({
    icon,
    title,
    imagePath,
    desc,
    href,
    linkText,
}: PracticeAreaCardProps) {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="relative h-48">
                <img
                    src={imagePath}
                    alt={title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-white">{icon}</div>
                </div>
            </div>
            <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                <p className="mb-4 text-gray-600">{desc}</p>
                <Link
                    href={href}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                >
                    {linkText} &rarr;
                </Link>
            </div>
        </div>
    )
}
