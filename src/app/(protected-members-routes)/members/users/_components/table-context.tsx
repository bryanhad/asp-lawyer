'use client'

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

type UsersTableContext = {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const UsersTableContext = createContext<UsersTableContext | null>(null)

export function useUsersTableContext() {
    const usersTableContext = useContext(UsersTableContext)
    if (usersTableContext === null) {
        throw new Error('useUsersTableContext must be used within a UsersTableContext Provider')
    }
    return usersTableContext
}

export function UsersTableContextProvider({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <UsersTableContext.Provider
            value={{
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </UsersTableContext.Provider>
    )
}
