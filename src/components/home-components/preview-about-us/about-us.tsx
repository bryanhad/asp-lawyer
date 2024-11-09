import { SectionContainer } from '@/components/containers/section-container'
import ImageWithBlur from '@/components/ui/image-with-blur'
import LinkButton from '@/components/ui/link-button'
import { getTranslations } from 'next-intl/server'
import { Separator } from '@/components/ui/separator'
import SelfGlazingStats from './self-glazing-stats'

export default async function AboutUs() {
    const t = await getTranslations('homePage.previewAboutUs')

    return (
        <SectionContainer
            side="right"
            textAlign="left"
            secondaryContent={
                <ImageWithBlur
                    className="rounded-xl"
                    src={'/home-page/squad.webp'}
                    alt="The SQUAD"
                    width={649}
                    height={320}
                />
            }
            titleTop={t('titleTop')}
            titleBottom={t('titleBottom')}
            desc={<p>{t('desc')}</p>}
        >
            <div className="w-full flex flex-col gap-6">
                <LinkButton className="max-md:mx-auto" href={'/about-us'}>
                    {t('callToAction')}
                </LinkButton>
                <Separator />
                <SelfGlazingStats />
            </div>
        </SectionContainer>
    )
}
