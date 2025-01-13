export type TableFetchDetail = {
    totalDataCount: number
    totalAvailablePages: number
    isUsingFilter: boolean
    fetchSize: number
    fetchedDataCount: number
    currentPage: number
}

export type FilterSearchParams = { size?: number; page?: number; q?: string }
