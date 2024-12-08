import { ReactNode } from 'react'
import SectionHeading, {
    Props as SectionHeadingProps,
} from '@/components/ui/section-heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type Props = {
    scrollClassName?: string
    children: ReactNode
}

export default function MemberInfo({
    children,
    lessAccentLineYSpacing = true,
    side = 'left',
    oneLine = true,
    scrollClassName,
    ...props
}: Props & SectionHeadingProps) {
    return (
        <div className="space-y-4">
            <SectionHeading
                oneLine={oneLine}
                side={side}
                lessAccentLineYSpacing={lessAccentLineYSpacing}
                lessImportant
                {...props}
            />
            <ScrollArea type="always" className="">
                <div className={cn("max-h-[300px] pr-6 md:max-h-[120px]", scrollClassName)}>
                    {children}
                </div>
            </ScrollArea>
        </div>
    )
}
