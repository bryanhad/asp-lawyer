import { SearchX } from 'lucide-react'

type Props = {
    searchTerm?: string
    singularEntity: string
}

export default function NotFound({ singularEntity, searchTerm }: Props) {
    return (
        <div className="flex flex-col items-center gap-4 py-16 px-4">
            <SearchX className="shrink-0" size={80} />
            <h2 className="text-2xl font-semibold">
                {searchTerm ? 'No Result found' : `Oops! There is no ${singularEntity} available`}
            </h2>
            {searchTerm ? (
                <p className="text-muted-foreground max-w-[500px] text-center break-words">
                    We cannot find any {singularEntity} that matches with<br />&apos;{searchTerm}&apos;
                </p>
            ) : (
                <p className="text-muted-foreground max-w-[500px] text-center">Maybe comeback some other time</p>
            )}
        </div>
    )
}
