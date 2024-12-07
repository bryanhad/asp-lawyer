import { BlogTranslationKey, Language } from '../../../src/lib/enum'
import { BlogsSeed, UsersSeed } from '../types'

export const usersAndBlogsSeed: (UsersSeed & { blogs: BlogsSeed[] })[] = [
    {
        id: 1,
        username: 'Admin Ganteng',
        email: 'admin@gmail.com',
        password: 'sipalingadmin12',
        blogs: [
            {
                id: 'cm4dpntdw0003tmao7zt3c0nx_1',
                imageUrl: 'https://utfs.io/f/4YTZLQcHF0RYRna1kkdMxNoITly7Q98XdeOL3CjYnziSaf5h',
                imageKey: '4YTZLQcHF0RYRna1kkdMxNoITly7Q98XdeOL3CjYnziSaf5h',
                translations: [
                    {
                        key: BlogTranslationKey.TITLE,
                        language: Language.EN,
                        value: 'Understanding Contract Law Basics',
                    },
                    {
                        key: BlogTranslationKey.TITLE,
                        language: Language.ID,
                        value: 'Memahami Dasar-Dasar Hukum Kontrak',
                    },
                    {
                        key: BlogTranslationKey.CONTENT,
                        language: Language.EN,
                        value: '<h1>Understanding Contract Law Basics</h1><p>Contract law is a fundamental area of legal practice that governs agreements between parties. It ensures that promises made during a contract are enforceable by law.</p><p><strong>Key Elements of a Contract:</strong></p><ul><li><strong>Offer:</strong> A proposal by one party to another.</li><li><strong>Acceptance:</strong> Agreement to the terms of the offer.</li><li><strong>Consideration:</strong> Something of value exchanged between the parties.</li></ul><p>Understanding these elements helps in recognizing and creating valid contracts, ensuring legal protection for all parties involved.</p>',
                    },
                    {
                        key: BlogTranslationKey.CONTENT,
                        language: Language.ID,
                        value: '<h1>Memahami Dasar-Dasar Hukum Kontrak</h1><p>Hukum kontrak adalah bidang hukum dasar yang mengatur perjanjian antara para pihak. Hukum ini memastikan bahwa janji yang dibuat dalam kontrak dapat ditegakkan secara hukum.</p><p><strong>Elemen Utama Kontrak:</strong></p><ul><li><strong>Penawaran:</strong> Usulan dari satu pihak ke pihak lain.</li><li><strong>Penerimaan:</strong> Persetujuan terhadap syarat penawaran.</li><li><strong>Imbalan:</strong> Sesuatu yang bernilai yang dipertukarkan antara para pihak.</li></ul><p>Memahami elemen-elemen ini membantu mengenali dan membuat kontrak yang sah, sehingga memberikan perlindungan hukum bagi semua pihak yang terlibat.</p>',
                    },
                ],
            },
        ],
    },
]
