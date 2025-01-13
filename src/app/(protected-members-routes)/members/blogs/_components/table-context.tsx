'use client'

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

type BlogsTableContext = {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const BlogsTableContext = createContext<BlogsTableContext | null>(null)

export function useBlogsTableContext() {
    const blogsTableContext = useContext(BlogsTableContext)
    if (blogsTableContext === null) {
        throw new Error('useBlogsTableContext must be used within a BlogsTableContext Provider')
    }
    return blogsTableContext
}

export function BlogsTableContextProvider({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <BlogsTableContext.Provider
            value={{
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </BlogsTableContext.Provider>
    )
}
