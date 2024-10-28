import { cn } from '@/lib/utils'
import { PracticeAreaTag } from './tags'
import { Link } from '@/i18n/routing'

type Props = { learnMoreIntl: string } & PracticeAreaTag

export default function TagPreview({
    title,
    desc,
    href,
    color,
    icon,
    learnMoreIntl,
}: Props) {
    return (
        <div className="flex w-full flex-col gap-4 rounded-lg p-6 shadow-md bg-white max-w-[600px]">
            <div className="flex items-center gap-4">
                <div className={cn('size-10 rounded-full grid place-items-center text-white', color)} >
                {icon}
                </div>
                <h3 className="text-lg font-semibold text-muted-foreground">{title}</h3>
            </div>
            <p className="text-muted-foreground line-clamp-3">{desc}</p>
            <Link href={href}>{learnMoreIntl}</Link>
        </div>
    )
}
