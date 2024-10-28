import {
    CarouselItem
} from '@/components/ui/carousel'
import { getTranslations } from 'next-intl/server'
import { MemberCard, MemberCardProps } from '../member-components/member-card'
import { MemberCarousel } from '../member-components/member-carousel'
import { SectionContainer } from '../ui/containers'
import LinkButton from '../ui/link-button'

type CarouselMembersData = ({ order: number } & MemberCardProps)[]

export default async function PreviewMembers() {
    const t = await getTranslations('homePage.previewMembers')
    const tLawyers = await getTranslations('lawyers')

    const sortedMembers: CarouselMembersData = members
        .map((member) => ({
            ...member,
            position: tLawyers(`${member.name}.position`),
            imageSrc: `/lawyers/${member.name}.png`,
        }))
        .sort((a, b) => a.order - b.order)

    return (
        <SectionContainer 
            titleTop={t('titleTop')}
            titleBottom={t('titleBottom')}
        desc={<p>{t('desc')}</p>}>
            {/* <BioEditor /> */}
            <MemberCarousel>
                {sortedMembers.map((member) => (
                    <CarouselItem
                        key={member.name}
                        className="pl-0 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                        <div className="p-6">
                            <MemberCard
                                key={member.name}
                                {...member}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </MemberCarousel>
            <LinkButton variant={'outline-accent'} href={'/members'}>
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}
const members = [
    {
        order: 1,
        name: 'arif' as const,
        position: 'Paralegal',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 2,
        name: 'herlin' as const,
        position: 'Paralegal',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 3,
        name: 'edward' as const,
        position: 'Senior Partner',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 4,
        name: 'dani' as const,
        position: 'Senior Associate',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 5,
        name: 'kharis' as const,
        position: 'Consultant',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfm.com',
    },
    {
        order: 6,
        name: 'adnan' as const,
        position: 'Senior Partner',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 7,
        name: 'agung' as const,
        position: 'Junior Partner',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 8,
        name: 'indah' as const,
        position: 'Senior Associate',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 9,
        name: 'tracy' as const,
        position: 'Associate',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 10,
        name: 'andy' as const,
        position: 'Associate',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 11,
        name: 'betti' as const,
        position: 'Consultant',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 12,
        name: 'erwin' as const,
        position: 'Junior Partner',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 13,
        name: 'indra' as const,
        position: 'Junior Partner',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 14,
        name: 'faras' as const,
        position: 'Consultant',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 15,
        name: 'ratna' as const,
        position: 'Senior Partner',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
    {
        order: 16,
        name: 'fahmi' as const,
        position: 'Associate',
        linkedInUrl: 'https://www.linkedin.com/in/johndoe',
        email: 'john.doe@lawfirm.com',
    },
]
