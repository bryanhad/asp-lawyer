import React, { PropsWithChildren } from 'react'

type Props = {} & PropsWithChildren

export function MainContainer({ children }: Props) {
    return <div className="flex justify-center">{children}</div>
}

export function SectionContainer({ children }: Props) {
    return <div className="w-full max-w-[1820px]">{children}</div>
}
