import LinkButton from '@/components/ui/link-button'
import { Frown } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function NotFoundPage() {
    const t = await getTranslations('not-found')
    return (
        <div className="mb-16 mt-40 flex flex-[1] flex-col items-center justify-center gap-3 lg:mt-44 lg:gap-6">
            <div className="flex flex-col items-center gap-2">
                <Frown className="shrink-0 text-primary" size={100} />
                <h2 className="text-3xl text-primary lg:text-5xl">{t('whoops')}</h2>
            </div>
            <div className="space-y-2 text-center">
                <h1 className="max-w-[500px] text-foreground lg:text-xl">{t('title')}</h1>
            </div>
            <LinkButton href={'/'}>{t('desc')}</LinkButton>
        </div>
    )
}
