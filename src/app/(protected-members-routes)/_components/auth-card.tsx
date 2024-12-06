import { cn } from '@/lib/utils'

type Props = {
    title: string
    children: React.ReactNode
    headerLabel: string
}

export const AuthCard = ({ title, children, headerLabel }: Props) => {
    return (
        <div className="w-full max-w-[500px] rounded-md border">
            <div className="mb-3 flex w-full flex-col items-center justify-center gap-y-4 px-8 pt-6">
                <h1 className={cn('text-center text-xl md:text-3xl')}>{title}</h1>
                <p className="text-center text-sm text-muted-foreground">{headerLabel}</p>
            </div>
            <div className="px-8 pb-8">{children}</div>
        </div>
    )
}
