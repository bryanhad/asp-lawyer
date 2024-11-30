import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

type Props = {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel?: string
    backButtonHref?: string
}

export const AuthCard = ({
    backButtonHref,
    backButtonLabel,
    children,
    headerLabel,
}: Props) => {
    return (
        <Card className="w-full max-w-[500px] shadow-md">
            <CardHeader>
                <div className="flex w-full flex-col items-center justify-center gap-y-4">
                    <h1 className={cn('text-3xl')}>ASP Members</h1>
                    <p className="text-sm text-muted-foreground">
                        {headerLabel}
                    </p>
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
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
