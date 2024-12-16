import { Locale } from '@/i18n/request'
import { SearchX } from 'lucide-react'
import { Span } from 'next/dist/trace'

type Props = {
    searchTerm?: string
    singularEntity: { en: string; id: string }
    currentLocale: Locale
}

export default function NotFound({ singularEntity, searchTerm, currentLocale }: Props) {
    return (
        <div className="flex flex-col items-center gap-4 px-4 py-16">
            <SearchX className="shrink-0" size={80} />
            <h2 className="text-2xl font-semibold">
                {searchTerm ? (
                    <span>{currentLocale === 'en' ? 'No Result Found' : 'Pencarian Tidak ditemukan'}</span>
                ) : (
                    <span>
                        {currentLocale === 'en'
                            ? `Oops! There is no ${singularEntity.en} available`
                            : `Uups! Tidak ada ${singularEntity.id} yang tersedia`}
                    </span>
                )}
            </h2>
            {searchTerm ? (
                <p className="max-w-[600px] break-words text-center text-muted-foreground">
                    {currentLocale === 'en' ? (
                        <span>We cannot find any {singularEntity.en} that matches with</span>
                    ) : (
                        <span>Kami tidak dapat menemukan {singularEntity.id} yang memiliki nama</span>
                    )}
                    <br />
                    &apos;{searchTerm}&apos;
                </p>
            ) : (
                <p className="max-w-[500px] text-center text-muted-foreground">
                    {currentLocale === 'en'
                        ? 'Maybe comeback some other time'
                        : 'Anda dapat mengunjungi halaman ini pada lain waktu'}
                </p>
            )}
        </div>
    )
}
