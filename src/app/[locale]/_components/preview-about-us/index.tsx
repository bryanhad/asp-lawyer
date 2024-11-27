import Section from '@/components/containers/section'
import ImageWithBlur from '@/components/ui/image-with-blur'
import LinkButton from '@/components/ui/link-button'
import SectionHeading from '@/components/ui/section-heading'
import { Separator } from '@/components/ui/separator'
import { getTranslations } from 'next-intl/server'
import SelfGlazingStats from './self-glazing-stats'

export default async function PreviewAboutUs() {
    const t = await getTranslations('homePage.previewAboutUs')

    return (
        <div className="w-full bg-secondary/60 dark:bg-secondary">
            <Section className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* GRID 1 */}
                <ImageWithBlur
                    className="rounded-md shadow-md dark:brightness-[90%]"
                    src={`https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/4YTZLQcHF0RYUqloJyzObXmFsjS39BxoYHaeJ0yCUQhf1gO5`}
                    alt="Picture of ASP lawyers"
                    width={649}
                    height={320}
                />
                {/* GRID 2 */}
                <div className="flex flex-col gap-4">
                    <SectionHeading
                        titleTop={t('titleTop')}
                        titleBottom={t('titleBottom')}
                        side={'right'}
                        textAlign={'left'}
                    />
                    <p className="text-center text-muted-foreground md:text-start">
                        {t('desc')}
                    </p>
                    <LinkButton
                        className="mt-6 max-md:mx-auto"
                        href={'/about-us'}
                    >
                        {t('callToAction')}
                    </LinkButton>
                    <Separator />
                    <SelfGlazingStats
                        yearsOfExperienceIntl={t('glaze.yearsOfExperience')}
                        casesWonIntl={t('glaze.casesWon')}
                        clientSatisfactionIntl={t('glaze.clientSatisfaction')}
                    />
                </div>
            </Section>
        </div>
    )
}
