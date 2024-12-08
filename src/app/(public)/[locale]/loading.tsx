import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="mb-44 mt-64 flex flex-[1] items-center lg:mt-72 xl:mt-80">
            <Loader2 className="mx-auto shrink-0 animate-spin text-neutral-300" size={80} />
        </div>
    )
}
