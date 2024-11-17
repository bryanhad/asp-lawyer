import Section from '@/components/containers/section'
import Image from 'next/image'
import SectionHeading from '@/components/ui/section-heading'
import dynamic from 'next/dynamic'

const PinContainer = dynamic(
    () => import('./animated-pin'),
    {
        loading: () => <p>Loading..</p>,
    },
)

export default function AchievementSection() {
    return (
        <Section>
            <SectionHeading oneLine titleTop="Our" titleBottom="Achievements" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                <PinContainer
                    title="Mr. Muhamad Arifudin, S.H., M.H., elected as the chairman of Ikatan Keluarga Alumni Fakultas Hukum Universitas Muhammadiyah Palembang 2023 - 2027."
                    containerClassName="relative z-10"
                >
                    <div className="w-[300px] mx-auto">
                        <Image
                            src={`https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/4YTZLQcHF0RYhVZoJptN8g1qOs04ZHVmLUQMjt9XCRG7wid5`}
                            alt=""
                            width={300}
                            height={300}
                        />
                        <div className="p-4">
                            Chairman of Law Alumni Association (2023-2027)
                        </div>
                    </div>
                </PinContainer>
                <PinContainer
                    title="Mr. Muhamad Arifudin, S.H., M.H., elected as the chairman of Ikatan Keluarga Alumni Fakultas Hukum Universitas Muhammadiyah Palembang 2023 - 2027."
                    containerClassName="relative z-10"
                >
                    <div className="w-[300px] mx-auto">
                        <Image
                            src={`https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/4YTZLQcHF0RYhVZoJptN8g1qOs04ZHVmLUQMjt9XCRG7wid5`}
                            alt=""
                            width={300}
                            height={300}
                        />
                        <div className="p-4">
                            Chairman of Law Alumni Association (2023-2027)
                        </div>
                    </div>
                </PinContainer>
                <PinContainer
                    title="Mr. Muhamad Arifudin, S.H., M.H., elected as the chairman of Ikatan Keluarga Alumni Fakultas Hukum Universitas Muhammadiyah Palembang 2023 - 2027."
                    containerClassName="relative z-10"
                >
                    <div className="w-[300px] mx-auto">
                        <Image
                            src={`https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/4YTZLQcHF0RYhVZoJptN8g1qOs04ZHVmLUQMjt9XCRG7wid5`}
                            alt=""
                            width={300}
                            height={300}
                        />
                        <div className="p-4">
                            Chairman of Law Alumni Association (2023-2027)
                        </div>
                    </div>
                </PinContainer>
            </div>
        </Section>
    )
}
