import { FolderOpen } from 'lucide-react'

type Props = {
    title: string
    desc: string
}

export default function NoResult({ title, desc }: Props) {
    return (
        <section className="gap4 flex flex-col">
            <FolderOpen size={70} className="mt-4 shrink-0" />
            <h1 className="text-xl">{title}</h1>
            <p>{desc}</p>
        </section>
    )
}
