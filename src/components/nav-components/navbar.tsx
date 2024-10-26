import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import LanguageSelect from './language-select'
import { Locale } from '@/i18n/request'

type Props = {
    selectedLocale: Locale
}

async function Navbar({ selectedLocale }: Props) {
    const t = await getTranslations('Navbar')

    return (
        <nav className="flex justify-between items-center p-6">
            <div>
                <Link href={'/'}>{t('home')}</Link>
                <Link href={'/about'}>{t('about')}</Link>
                <Link href={'/contact'}>{t('contact')}</Link>
            </div>
            <div>
                <LanguageSelect selectedLocale={selectedLocale} />
            </div>
        </nav>
    )
}

export default Navbar
