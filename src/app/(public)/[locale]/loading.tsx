import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="mb-44 mt-72 flex flex-[1] items-center xl:mt-96 xl:mb-60">
            <Loader2 className="mx-auto shrink-0 animate-spin text-neutral-300" size={80} />
        </div>
    )
}
