"use client"
import { useRef, useState } from "react"

import { SearchIcon, XIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

import { useSearchParams } from "@/hooks/use-search-params"

export const SearchInput = () => {

    const [search, setSearch] = useSearchParams("search")
    
    const [value, setValue] = useState(search)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleClear = () => {
        setValue("")
        setSearch("")
        inputRef.current?.blur()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch(value)
        inputRef.current?.blur()
    }

    return (
        <div className="w-full flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-[720px]"
            >
                <Input
                    className="md:text-base placeholder:text-neutral-800 px-12 sm:px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#eeeeee] rounded-full h-[48px] focus-visible:ring-0 focus:bg-[#fafbfd] touch-manipulation transition-colors duration-150"
                    placeholder="Search"
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 [&_svg]:size-4 sm:[&_svg]:size-5 rounded-full min-h-[40px] min-w-[40px] touch-manipulation active:bg-accent/70 active:scale-95 transition-all duration-75"
                >
                    <SearchIcon />
                </Button>
                {
                    value &&
                    (
                        // A Button in form element is automatically assigned to be a Submit Button
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 [&_svg]:size-4 sm:[&_svg]:size-5 rounded-full min-h-[40px] min-w-[40px] touch-manipulation active:bg-accent/70 active:scale-95 transition-all duration-75"
                            onClick={handleClear}
                        >
                            <XIcon />
                        </Button>
                    )
                }
            </form>
        </div>
    )
}