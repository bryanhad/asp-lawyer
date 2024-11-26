import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { Metadata } from 'next'
import { cache, ReactNode } from 'react'
import { getCurrentLocale } from '../../layout'
import { getData } from './action'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import SectionHeading, {
    Props as SectionHeadingProps,
} from '@/components/ui/section-heading'
import { poppins } from '@/app/[locale]/fonts'

type Props = {
    params: Promise<{ slug: string }>
}

const fetchMemberPageContent = cache(async (slug: string) => {
    return await Promise.all([
        getTranslations('eachMemberPage'),
        getData(slug),
        getCurrentLocale(),
    ])
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const [t, member] = await fetchMemberPageContent(slug)

    const capitalizedName = capitalizeFirstLetter(member.name)

    return {
        title: t('pageTitle', { name: capitalizedName }),
    }
}

export default async function MemberPage({ params }: Props) {
    const { slug } = await params
    const [t, member, currentLocale] = await fetchMemberPageContent(slug)

    const memberExperiences =
        currentLocale === 'en' ? member.experience.en : member.experience.id

    return (
        <BaseContainer>
            <PageTitleWithBackground
                src={'/home-page/practice-areas.jpg'}
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={member.name}
            />
            <Section lessYSpacing>
                <div className="flex gap-10 items-start">
                    <div className="relative min-w-[400px] bg-secondary">
                        <Image
                            src={member.imageUrl}
                            alt={`Picture of ${member.name}`}
                            width={400}
                            height={400}
                            placeholder="blur"
                            blurDataURL={member.blurImageUrl}
                        />
                        <div
                            className={cn(
                                poppins.className,
                                'absolute bottom-0 left-0 z-30 flex w-full flex-col items-center bg-stone-100/90 px-4 py-3 text-lg font-semibold backdrop-blur-sm dark:bg-secondary/70 max-md:text-sm',
                            )}
                        >
                            <div className="flex flex-col items-center space-y-1">
                                <p className="text-stone-700 dark:text-primary">
                                    {member.name}
                                    <span className="ml-2 font-light">
                                        {currentLocale === 'en'
                                            ? member.degree.en
                                            : member.degree.id}
                                    </span>
                                </p>
                                <p className="w-full max-w-max rounded-full border border-muted-foreground px-4 py-1 font-light text-stone-600 dark:text-muted-foreground">
                                    {currentLocale === 'en'
                                        ? member.position.en
                                        : member.position.id}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* CONTENT */}
                    <div className="flex flex-col gap-2">
                        <MemberInfo titleTop="About" titleBottom="Me">
                            <p className="text-muted-foreground whitespace-pre-line">
                                {currentLocale === 'en'
                                    ? member.bio.en
                                    : member.bio.id}
                            </p>
                        </MemberInfo>
                        <MemberInfo titleTop="My" titleBottom="Experiences">
                            <ul className="list-disc text-muted-foreground">
                                {memberExperiences.map((exp, i) => (
                                    <li key={i} className="ml-4">
                                        {exp}
                                    </li>
                                ))}
                            </ul>
                        </MemberInfo>
                    </div>
                </div>
            </Section>
        </BaseContainer>
    )
}

function MemberInfo({
    children,
    lessAccentLineYSpacing = true,
    side = 'left',
    oneLine = true,
    ...props
}: { children: ReactNode } & SectionHeadingProps) {
    return (
        <div className="space-y-3">
            <SectionHeading
                oneLine={oneLine}
                side={side}
                lessAccentLineYSpacing={lessAccentLineYSpacing}
                {...props}
            />
            <div className={cn('max-h-[200px] overflow-auto')}>{children}</div>
        </div>
    )
}
