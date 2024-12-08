import React, { ReactNode } from 'react'

type Props = {
    header?: ReactNode
    children: ReactNode
}

export default function SettingsFormWrapper({ header, children }: Props) {
    return (
        <section className="gap-3 rounded-md border p-6 flex flex-col">
            <div className="space-y-2">{header}</div>
            {children}
        </section>
    )
}
