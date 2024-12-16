import Section from '@/app/(public)/_components/containers/section'
import LinkButton from '@/components/ui/link-button'
import SectionHeading from '@/components/ui/section-heading'
import { Separator } from '@/components/ui/separator'
import { getTranslations } from 'next-intl/server'
import SelfGlazingStats from './self-glazing-stats'
import { getBlurredImageUrl } from '@/lib/server-utils'
import ImageWithFallbackPlaceholder from '@/components/ui/image-with-fallback-placeholder'

export default async function PreviewAboutUs() {
    const t = await getTranslations('homePage.previewAboutUs')
    const imageUrl = `https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/4YTZLQcHF0RYuuKehxTtzqiMx6UFXJOGBjwVWfpcnvCoY823`
    const blurImage = await getBlurredImageUrl(imageUrl)

    return (
        <div className="w-full bg-secondary/60 dark:bg-secondary">
            <Section className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* GRID 1 */}
                <ImageWithFallbackPlaceholder
                    variant="naked"
                    className="rounded-md shadow-md dark:brightness-[90%]"
                    src={imageUrl}
                    placeholder="blur"
                    blurDataURL={blurImage}
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
                    <p className="text-center text-muted-foreground md:text-start">{t('desc')}</p>
                    <LinkButton className="mt-6 max-md:mx-auto" href={'/about-us'}>
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
