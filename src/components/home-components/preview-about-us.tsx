import { getTranslations } from 'next-intl/server'
import { SectionContainer } from '../containers/section-container'
import ImageWithBlur from '../ui/image-with-blur'
import LinkButton from '../ui/link-button'

export default async function PreviewAboutUs() {
    const t = await getTranslations('homePage.previewAboutUs')

    return (
        <SectionContainer
            side="right"
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
            <LinkButton className='max-md:mx-auto' href={'/about-us'}>
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}
