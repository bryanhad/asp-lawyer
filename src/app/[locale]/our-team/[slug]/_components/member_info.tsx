import { ReactNode } from 'react'
import SectionHeading, {
    Props as SectionHeadingProps,
} from '@/components/ui/section-heading'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function MemberInfo({
    children,
    lessAccentLineYSpacing = true,
    side = 'left',
    oneLine = true,
    ...props
}: { children: ReactNode } & SectionHeadingProps) {
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
                <div className="max-h-[300px] pr-6 md:h-[120px]">
                    {children}
                </div>
            </ScrollArea>
        </div>
    )
}
