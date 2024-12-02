import { ReactNode } from 'react'
import Section from '../../app/(public)/_components/containers/section'

type Props = {
    desc: ReactNode
}

export default function PageDescription({ desc }: Props) {
    return (
        <Section lessYSpacing>
            <div className="mx-auto max-w-[900px]">
                <p className="text-center leading-7 text-muted-foreground">{desc}</p>
                {/* <div className="mt-6 flex items-center justify-center gap-4">
                <Separator className="w-[20%] min-w-20 bg-primary" />
                <Scale className="shrink-0 text-primary" size={20} />
                <Separator className="w-[20%] min-w-36 bg-primary" />
            </div> */}
            </div>
        </Section>
    )
}
