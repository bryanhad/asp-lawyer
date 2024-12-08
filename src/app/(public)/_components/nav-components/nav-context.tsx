'use client'

import { createContext, Dispatch, SetStateAction, useContext } from 'react'

type NavContext = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NavContext = createContext<NavContext | null>(null)

export function useNavContext() {
    const navContext = useContext(NavContext)
    if (navContext === null) {
        throw new Error(
            'useNavContext must be used within a NavContext Provider',
        )
    }
    return navContext
}
