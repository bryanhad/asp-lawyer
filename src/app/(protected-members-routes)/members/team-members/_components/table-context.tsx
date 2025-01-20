'use client'

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

type MembersTableContext = {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const MembersTableContext = createContext<MembersTableContext | null>(null)

export function useMembersTableContext() {
    const membersTableContext = useContext(MembersTableContext)
    if (membersTableContext === null) {
        throw new Error('useMembersTableContext must be used within a MembersTableContext Provider')
    }
    return membersTableContext
}

export function MembersTableContextProvider({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <MembersTableContext.Provider
            value={{
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </MembersTableContext.Provider>
    )
}
