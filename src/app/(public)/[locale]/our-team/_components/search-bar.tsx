'use client'

import { Input } from '@/components/ui/input'
import { debounce } from '@/lib/utils'
import { Search } from 'lucide-react'

type Props = {
    onSearch: (query: string) => void;
  };

export default function SearchBar({onSearch}: Props) {
    const handleChange = debounce<string>((input) => {
        onSearch(input); 
      }, 200);

    return (
        <div className="flex w-full max-w-[400px] rounded-full items-center gap-2  border border-foreground/40 bg-background px-3 h-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mx-auto">
            <label htmlFor="search">
                <Search className="shrink-0 text-foreground/40" size={20} />
            </label>
            <Input
                onChange={(e) => handleChange(e.target.value)}
                id="search"
                type="text"
                className="border-0 bg-transparent focus-visible:ring-transparent p-0 h-max"
                size={1}
            />
        </div>
    )
}
