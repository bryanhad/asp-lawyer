import { Loader2 } from 'lucide-react'

export default function Loading() {
    return <div className='flex-[1] flex items-center'>
        <Loader2 className="mx-auto animate-spin shrink-0 text-neutral-300" size={80} />
    </div>
}
