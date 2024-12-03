import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type Props = {
    title: string
    children: React.ReactNode
    headerLabel: string
    backButtonLabel?: string
    backButtonHref?: string
}

export const AuthCard = ({ title, backButtonHref, backButtonLabel, children, headerLabel }: Props) => {
    return (
        <div className="w-full max-w-[500px] border rounded-md">
            <div className="mb-3 flex w-full flex-col items-center justify-center gap-y-4 pt-6 px-8">
                <h1 className={cn('text-xl md:text-3xl text-center')}>{title}</h1>
                <p className="text-sm text-muted-foreground text-center">{headerLabel}</p>
            </div>
            <div className="px-8 pb-8">{children}</div>
            {backButtonHref && backButtonLabel && (
                <div>
                    <Button className="w-full font-normal" size={'sm'} asChild>
                        <Link href={backButtonHref}>{backButtonLabel}</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
