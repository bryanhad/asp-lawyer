import { PropsWithChildren } from 'react'

export default function AuthPageContainer({ children }: PropsWithChildren) {
    return <main className="mb-16 mt-32 flex flex-[1] items-center justify-center px-4">{children}</main>
}
