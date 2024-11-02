import {
    Briefcase,
    Building,
    FileText,
    PiggyBank,
    Scale,
    Users,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import LinkButton from '../../ui/link-button'
import Tags, { PracticeAreaTag } from './tags'
import { SectionContainer } from '@/components/containers/section-container'

const practiceAreas: PracticeAreaTag[] = [
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
]

export default async function PreviewPracticeAreas() {
    const t = await getTranslations('homePage.previewPracticeAreas')
    const learnMoreIntl = (await getTranslations('commonWords'))('learnMore')

    return (
        <>
            <div className="flex w-full flex-col items-center bg-gray-50">
                <SectionContainer
                    titleTop={t('titleTop')}
                    titleBottom={t('titleBottom')}
                    desc={<p>{t('desc')}</p>}
                    className="flex flex-col items-center"
                >
                    <div className="flex flex-col items-center gap-6">
                        <Tags
                            learnMoreIntl={learnMoreIntl}
                            tags={practiceAreas}
                        />
                        <LinkButton
                            variant={'outline-accent'}
                            href={'/about-us'}
                        >
                            {t('callToAction')}
                        </LinkButton>
                    </div>
                </SectionContainer>
            </div>
        </>
    )
}



