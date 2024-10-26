import { getTranslations } from 'next-intl/server'

export default async function Home() {
    const t = await getTranslations('HomePage')

    return (
        <div className="p-7">
            <h1 className="bold text-xl">{t('title')}</h1>
            <p>{t('desc')}</p>
        </div>
    )
}
