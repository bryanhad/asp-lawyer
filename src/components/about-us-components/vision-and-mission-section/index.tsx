import Section from '@/components/containers/section'
import SectionHeading from '@/components/ui/section-heading'

type Props = {
    vision: {
        title: string
        desc: string
    }
    mission: {
        title: string
        desc: string[]
    }
}

export default function VisionAndMissonSection({ vision, mission }: Props) {
    return (
        <Section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* GRID 1 */}
            <div className="flex flex-col gap-4">
                <SectionHeading
                    titleTop="Our Vison"
                    titleBottom="& Mision"
                    side="right"
                    textAlign="left"
                    oneLine
                />
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h3>{vision.title}</h3>
                        <p className="text-muted-foreground">{vision.desc}</p>
                    </div>
                    <div className="space-y-1">
                        <h3>{mission.title}</h3>
                        <ul className="ml-5 list-disc text-muted-foreground">
                            {mission.desc.map((str, i) => (
                                <li key={i}>{str}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* GRID 2 */}
            <div className="flex flex-col">
                {/* <Suspense fallback={<Skeleton />}>
                        <LawyerQuotes
                            cardItems={lawyersWithQuote}
                            currentLocale={currentLocale}
                        />
                    </Suspense> */}
            </div>
        </Section>
    )
}
