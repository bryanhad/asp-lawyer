import { BaseContainer } from '@/components/containers/base-container'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BlogForm } from './_components/form'
import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = await getTranslations('blogsPage')

    return {
        title: pageTitle('pageTitle'),
    }
}

export default async function BlogsPage() {
    const t = await getTranslations('blogsPage')

    return (
        <BaseContainer>
            <PageTitleWithBackground
                src={'/home-page/about-us.webp'}
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
            />
            <BlogForm
                titleWhite={t('form.addBlog.titleWhite')}
                titlePrimary={t('form.addBlog.titlePrimary')}
                titlePlaceholder={t('form.titlePlaceholder')}
                contentPlaceholder={t('form.contentPlaceholder')}
            />
        </BaseContainer>
    )
}
