import { BlogTranslationKey, Language } from '../../../src/lib/enum'
import { BlogsSeed, UsersSeed } from '../types'

export const usersAndBlogsSeed: (UsersSeed & { blogs: BlogsSeed[] })[] = [
    {
        id: 1,
        username: 'Admin Ganteng',
        email: 'admin@gmail.com',
        password: 'sipalingadmin12',
        emailIsVerified: true,
        blogs: [
            {
                id: 'cm4dpntdw0003tmao7zt3c0nx',
                imageUrl: 'https://utfs.io/f/4YTZLQcHF0RY4YZQjhyHF0RYbTEXNC9DxgSq6rs3KVGZtIQP',
                imageKey: '4YTZLQcHF0RY4YZQjhyHF0RYbTEXNC9DxgSq6rs3KVGZtIQP',
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
                        value: '<h2>Understanding Contract Law Basics</h2><p>Contract law is a fundamental area of legal practice that governs agreements between parties. It ensures that promises made during a contract are enforceable by law.</p><p><strong>Key Elements of a Contract:</strong></p><ul><li><strong>Offer:</strong> A proposal by one party to another.</li><li><strong>Acceptance:</strong> Agreement to the terms of the offer.</li><li><strong>Consideration:</strong> Something of value exchanged between the parties.</li></ul><p>Understanding these elements helps in recognizing and creating valid contracts, ensuring legal protection for all parties involved.</p>',
                    },
                    {
                        key: BlogTranslationKey.CONTENT,
                        language: Language.ID,
                        value: '<h2>Memahami Dasar-Dasar Hukum Kontrak</h2><p>Hukum kontrak adalah bidang hukum dasar yang mengatur perjanjian antara para pihak. Hukum ini memastikan bahwa janji yang dibuat dalam kontrak dapat ditegakkan secara hukum.</p><p><strong>Elemen Utama Kontrak:</strong></p><ul><li><strong>Penawaran:</strong> Usulan dari satu pihak ke pihak lain.</li><li><strong>Penerimaan:</strong> Persetujuan terhadap syarat penawaran.</li><li><strong>Imbalan:</strong> Sesuatu yang bernilai yang dipertukarkan antara para pihak.</li></ul><p>Memahami elemen-elemen ini membantu mengenali dan membuat kontrak yang sah, sehingga memberikan perlindungan hukum bagi semua pihak yang terlibat.</p>',
                    },
                ],
            },
            {
                id: 'cm4dpntdw0003tmao7zt3c0nx',
                imageUrl: 'https://utfs.io/f/4YTZLQcHF0RYk6J4WuKdCwzsmfXjgnD95pl6WENASGrq327Z',
                imageKey: '4YTZLQcHF0RYk6J4WuKdCwzsmfXjgnD95pl6WENASGrq327Z',
                translations: [
                    {
                        key: BlogTranslationKey.TITLE,
                        language: Language.EN,
                        value: 'Understanding Bankruptcy and Suspension of Debt Payment Obligations (PKPU)',
                    },
                    {
                        key: BlogTranslationKey.TITLE,
                        language: Language.ID,
                        value: 'Memahami Kepailitan dan Penundaan Kewajiban Pembayaran Utang (PKPU)',
                    },
                    {
                        key: BlogTranslationKey.CONTENT,
                        language: Language.EN,
                        value: '<h2>Understanding Bankruptcy and Suspension of Debt Payment Obligations (PKPU)</h2><p>Bankruptcy and PKPU are legal mechanisms in Indonesia designed to address financial distress faced by individuals or companies. These processes are crucial in ensuring that creditors are treated fairly while also providing debtors with a structured path to resolve their financial issues.</p><p>Bankruptcy is typically initiated when a debtor is unable to meet their financial obligations. The legal declaration of bankruptcy ensures that assets are distributed equitably among creditors. On the other hand, PKPU provides a temporary suspension, allowing the debtor to propose a settlement plan to creditors under the supervision of the court. This process aims to avoid bankruptcy by facilitating negotiations for debt restructuring.</p><p>Our law firm specializes in handling bankruptcy and PKPU cases. We provide expert guidance to ensure a fair resolution for all parties involved while navigating the complexities of the legal system.</p>',
                    },
                    {
                        key: BlogTranslationKey.CONTENT,
                        language: Language.ID,
                        value: '<h2>Memahami Kepailitan dan Penundaan Kewajiban Pembayaran Utang (PKPU)</h2><p>Kepailitan dan PKPU adalah mekanisme hukum di Indonesia yang dirancang untuk mengatasi kesulitan keuangan yang dihadapi oleh individu atau perusahaan. Proses ini sangat penting untuk memastikan bahwa kreditor diperlakukan secara adil sekaligus memberikan jalan bagi debitur untuk menyelesaikan masalah keuangannya secara terstruktur.</p><p>Kepailitan biasanya dimulai ketika seorang debitur tidak dapat memenuhi kewajiban keuangannya. Pernyataan hukum kepailitan memastikan bahwa aset didistribusikan secara adil di antara kreditor. Di sisi lain, PKPU memberikan penangguhan sementara, memungkinkan debitur untuk mengusulkan rencana penyelesaian kepada kreditor di bawah pengawasan pengadilan. Proses ini bertujuan untuk menghindari kepailitan dengan memfasilitasi negosiasi restrukturisasi utang.</p><p>Firma hukum kami memiliki keahlian dalam menangani kasus kepailitan dan PKPU. Kami memberikan panduan ahli untuk memastikan penyelesaian yang adil bagi semua pihak yang terlibat, sambil menjelajahi kompleksitas sistem hukum.</p>',
                    },
                ],
            },
            {
                id: 'cm4dpntdw0003tmao7zt3c0nx',
                imageUrl: 'https://utfs.io/f/4YTZLQcHF0RYEydowhptbjaLHTsDWNAOSxPrkuCyUhVQ1cZ0',
                imageKey: '4YTZLQcHF0RYEydowhptbjaLHTsDWNAOSxPrkuCyUhVQ1cZ0',
                translations: [
                    {
                        key: BlogTranslationKey.TITLE,
                        language: Language.EN,
                        value: 'The Role of Legal Advisors in PKPU Proceedings',
                    },
                    {
                        key: BlogTranslationKey.TITLE,
                        language: Language.ID,
                        value: 'Peran Penasihat Hukum dalam Proses PKPU',
                    },
                    {
                        key: BlogTranslationKey.CONTENT,
                        language: Language.EN,
                        value: '<h2>The Role of Legal Advisors in PKPU Proceedings</h2><p>PKPU proceedings involve complex legal and financial negotiations. Legal advisors play a critical role in representing the interests of creditors and debtors throughout the process. From drafting agreements to facilitating creditor meetings, a skilled legal advisor ensures transparency and compliance with regulations.</p><p>Our team assists clients in preparing detailed settlement plans, managing creditor communication, and ensuring adherence to timelines set by the court. With our extensive experience, we have successfully guided numerous clients through PKPU proceedings, achieving resolutions that benefit all parties involved.</p>',
                    },
                    {
                        key: BlogTranslationKey.CONTENT,
                        language: Language.ID,
                        value: '<h2>Peran Penasihat Hukum dalam Proses PKPU</h2><p>Proses PKPU melibatkan negosiasi hukum dan keuangan yang kompleks. Penasihat hukum memainkan peran penting dalam mewakili kepentingan kreditor dan debitur sepanjang proses ini. Mulai dari menyusun perjanjian hingga memfasilitasi pertemuan kreditor, penasihat hukum yang terampil memastikan transparansi dan kepatuhan terhadap peraturan.</p><p>Tim kami membantu klien dalam menyiapkan rencana penyelesaian yang rinci, mengelola komunikasi dengan kreditor, dan memastikan kepatuhan terhadap batas waktu yang ditetapkan oleh pengadilan. Dengan pengalaman luas, kami telah berhasil membimbing banyak klien melalui proses PKPU, mencapai resolusi yang menguntungkan semua pihak yang terlibat.</p>',
                    },
                ],
            },
            {
                id: 'cm4dpntdw0003tmao7zt3c0nx',
                imageUrl: 'https://utfs.io/f/4YTZLQcHF0RYMc7NrRVpTmdbGDSok6Eqnz9hZgHvAascB0jx',
                imageKey: '4YTZLQcHF0RYMc7NrRVpTmdbGDSok6Eqnz9hZgHvAascB0jx',
                translations: [
                    {
                        key: BlogTranslationKey.TITLE,
                        language: Language.EN,
                        value: 'Safeguarding Your Intellectual Property Rights',
                    },
                    {
                        key: BlogTranslationKey.TITLE,
                        language: Language.ID,
                        value: 'Melindungi Hak Kekayaan Intelektual Anda',
                    },
                    {
                        key: BlogTranslationKey.CONTENT,
                        language: Language.EN,
                        value: '<h2>Safeguarding Your Intellectual Property Rights</h2><p>Intellectual property rights are critical assets for businesses and individuals, encompassing trademarks, copyrights, patents, and trade secrets. Protecting these rights is essential to maintaining competitive advantage and fostering innovation.</p><p>Our law firm provides comprehensive intellectual property services, including registration, enforcement, and dispute resolution. We work closely with clients to develop strategies tailored to their specific needs, ensuring their intellectual property is safeguarded against infringement.</p>',
                    },
                    {
                        key: BlogTranslationKey.CONTENT,
                        language: Language.ID,
                        value: '<h2>Melindungi Hak Kekayaan Intelektual Anda</h2><p>Hak kekayaan intelektual adalah aset penting bagi bisnis dan individu, mencakup merek dagang, hak cipta, paten, dan rahasia dagang. Melindungi hak-hak ini sangat penting untuk mempertahankan keunggulan kompetitif dan mendorong inovasi.</p><p>Firma hukum kami menyediakan layanan kekayaan intelektual yang komprehensif, termasuk pendaftaran, penegakan, dan penyelesaian sengketa. Kami bekerja sama dengan klien untuk mengembangkan strategi yang disesuaikan dengan kebutuhan spesifik mereka, memastikan hak kekayaan intelektual mereka terlindungi dari pelanggaran.</p>',
                    },
                ],
            },
        ],
    },
]
