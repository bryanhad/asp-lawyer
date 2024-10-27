import { getTranslations } from 'next-intl/server'
import { SectionContainer } from '../ui/containers'
import LinkButton from '../ui/link-button'
import Image from 'next/image'

export default async function AboutUsPreview() {
    const t = await getTranslations('homePage.aboutUsPreview')

    return (
        <SectionContainer
            side="left"
            secondaryContent={
                <Image
                    className='rounded-xl'
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
