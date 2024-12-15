import Section from '@/app/(public)/_components/containers/section'
import ImageWithFallbackPlaceholder from '@/components/ui/image-with-fallback-placeholder'
import SectionHeading from '@/components/ui/section-heading'
import { getBlurredImageUrl } from '@/lib/server-utils'
import { getTranslations } from 'next-intl/server'

export default async function VisionAndMissonSection() {
    const t = await getTranslations('aboutPage')
    const imageUrl = `https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/4YTZLQcHF0RYUqloJyzObXmFsjS39BxoYHaeJ0yCUQhf1gO5`
    const blurImage = await getBlurredImageUrl(imageUrl)

    return (
        <Section className="grid grid-cols-1 gap-6 max-md:px-8 md:grid-cols-2 md:px-6" lessYSpacing>
            {/* GRID 1 */}
            <div className="flex flex-col gap-4">
                <SectionHeading
                    titleTop={t('previewVisionAndMission.titleWhite')}
                    titleBottom={t('previewVisionAndMission.titlePrimary')}
                    side="right"
                    textAlign="left"
                    oneLine
                />
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h3>{t('previewVisionAndMission.vision.title')}</h3>
                        <p className="max-w-[600px] text-muted-foreground">
                            {t('previewVisionAndMission.vision.desc')}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <h3>{t('previewVisionAndMission.mission.title')}</h3>
                        <ul className="ml-5 max-w-[600px] list-disc text-muted-foreground">
                            <li>{t(`previewVisionAndMission.mission.1`)}</li>
                            <li>{t(`previewVisionAndMission.mission.2`)}</li>
                            <li>{t(`previewVisionAndMission.mission.3`)}</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* GRID 2 */}
            <ImageWithFallbackPlaceholder
                variant="naked"
                className="rounded-md shadow-md dark:brightness-[85%]"
                src={imageUrl}
                placeholder="blur"
                blurDataURL={blurImage}
                alt="Picture of ASP lawyers"
                width={649}
                height={320}
            />
        </Section>
    )
}
