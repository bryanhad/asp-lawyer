import { getTranslations } from 'next-intl/server'
import LinkButton from '../ui/link-button'
import ImageWithBlur from '../ui/image-with-blur'
import { SectionContainer } from '../containers/section-container'

export default async function PreviewAboutUs() {
    const t = await getTranslations('homePage.previewAboutUs')

    return (
        <SectionContainer
            side="left"
            className="aspect-[16/5.3]"
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
            <LinkButton className='max-md:mx-auto' variant={'outline-accent'} href={'/about-us'}>
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}
