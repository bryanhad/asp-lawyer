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
        <div className="flex w-full flex-col gap-4 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-4">
                <div className={cn('size-8 rounded-full', color)} />
                {icon}
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-muted">{desc}</p>
            <Link href={href}>{learnMoreIntl}</Link>
        </div>
    )
}
