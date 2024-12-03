import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type Props = {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel?: string
    backButtonHref?: string
}

export const AuthCard = ({ backButtonHref, backButtonLabel, children, headerLabel }: Props) => {
    return (
        <Card className="w-full max-w-[500px] shadow-md">
            <div className="mb-3 flex w-full flex-col items-center justify-center gap-y-4 pt-6">
                <h1 className={cn('text-3xl')}>ASP Members</h1>
                <p className="text-sm text-muted-foreground">{headerLabel}</p>
            </div>
            <div className="px-8 pb-8">{children}</div>
            {backButtonHref && backButtonLabel && (
                <CardFooter>
                    <Button className="w-full font-normal" size={'sm'} asChild>
                        <Link href={backButtonHref}>{backButtonLabel}</Link>
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
