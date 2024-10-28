import { Link } from '@/i18n/routing'
import {
    Briefcase,
    Building,
    FileText,
    PiggyBank,
    Scale,
    Users,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { ReactNode } from 'react'
import { SectionContainer } from '../../ui/containers'
import ImageWithBlur from '../../ui/image-with-blur'
import LinkButton from '../../ui/link-button'
import Tags from './tags'

export default async function PreviewPracticeAreas() {
    const t = await getTranslations('homePage.previewPracticeAreas')
    const learnMoreIntl = (await getTranslations('commonWords'))('learnMore')

    return (
        <div className="flex w-full flex-col items-center bg-gray-50">
            <SectionContainer
                title={t('title')}
                desc={<p>{t('desc')}</p>}
                className="flex flex-col items-center"
            >
                <Tags
                    learnMoreIntl={learnMoreIntl}
                    tags={[
                        {
                            title: 'Litigation',
                            desc: 'Our litigation team excels in representing clients in court, arbitration, and mediation. We handle complex civil litigation, commercial disputes, and appellate advocacy with precision and strategic thinking.',
                            icon: <Scale />,
                            href: '',
                            color: 'bg-blue-500',
                        },
                        {
                            title: 'Bankruptcy Law',
                            desc: 'We guide individuals and businesses through financial distress, offering expert advice on bankruptcy filings, debt restructuring, and asset protection. Our team ensures clients navigate these challenging times with confidence.',
                            icon: <PiggyBank />,
                            href: '',
                            color: 'bg-green-500',
                        },
                        {
                            title: 'Copyright Law',
                            desc: 'Our intellectual property experts safeguard your creative works. We handle copyright registrations, infringement cases, and licensing agreements, ensuring your intellectual assets are protected and leveraged effectively.',
                            icon: <FileText />,
                            href: '',
                            color: 'bg-purple-500',
                        },
                        {
                            title: 'Family Law',
                            desc: 'We provide compassionate and skilled representation in all areas of family law, including divorce, child custody, adoption, and domestic violence cases. Our team is dedicated to achieving the best outcomes for families in transition.',
                            icon: <Users />,
                            href: '',
                            color: 'bg-red-500',
                        },
                        {
                            title: 'Corporate Law',
                            desc: 'Our corporate law team assists businesses of all sizes with entity formation, mergers and acquisitions, corporate governance, and regulatory compliance. We provide strategic legal advice to help your business thrive.',
                            icon: <Building />,
                            href: '',
                            color: 'bg-indigo-500',
                        },
                        {
                            title: 'Employment Law',
                            desc: 'We represent both employers and employees in all aspects of employment law, including discrimination claims, wrongful termination, wage disputes, and employment contract negotiations. Our expertise ensures fair and lawful workplace practices.',
                            icon: <Briefcase />,
                            href: '',
                            color: 'bg-yellow-500',
                        },
                    ]}
                />
                <div className="mb-12 grid w-full max-w-[1800px] grid-cols-1 gap-8 md:grid-cols-3">
                    <PracticeAreaCard
                        icon={<Scale size={48} />}
                        title={t('topPracticeAreas.litigation.title')}
                        desc={t('topPracticeAreas.litigation.shortDesc')}
                        imagePath="/home-page/practice-bankruptcy.jpg"
                        href="/practice-areas/litigation"
                        linkText={learnMoreIntl}
                    />
                    <PracticeAreaCard
                        icon={<PiggyBank size={48} className="shrink-0" />}
                        title={t('topPracticeAreas.bankruptcyLaw.title')}
                        desc={t('topPracticeAreas.bankruptcyLaw.shortDesc')}
                        imagePath="/home-page/practice-copyright.jpg"
                        href="/practice-areas/bankruptcy"
                        linkText={learnMoreIntl}
                    />
                    <PracticeAreaCard
                        icon={<FileText size={48} />}
                        title={t('topPracticeAreas.copyright.title')}
                        desc={t('topPracticeAreas.copyright.shortDesc')}
                        imagePath="/home-page/practice-litigation.jpg"
                        href="/practice-areas/copyright"
                        linkText={learnMoreIntl}
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
                <ImageWithBlur
                    src={imagePath}
                    alt={title}
                    width={400}
                    height={200}
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
