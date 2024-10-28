import { getTranslations } from 'next-intl/server'
import { SectionContainer } from '../ui/containers'
import LinkButton from '../ui/link-button'
import ImageWithBlur from '../ui/image-with-blur'

export default async function PreviewAboutUs() {
    const t = await getTranslations('homePage.previewAboutUs')

    return (
        <SectionContainer
            side="left"
            secondaryContent={
                <ImageWithBlur
                    className="rounded-xl"
                    src={'/home-page/squad.webp'}
                    alt="The SQUAD"
                    width={640}
                    height={300}
                />
            }
            title={t('title')}
            desc={<p>{t('desc')}</p>}
        >
            <LinkButton variant={'outline-accent'} href={'/about-us'}>
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}
