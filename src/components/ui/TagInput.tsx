

import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface TagInputProps {
    value: string[]
    onChange: (tags: string[]) => void
    placeholder?: string
}

export const TagInput = ({ value, onChange, placeholder }: TagInputProps) => {
    const [inputValue, setInputValue] = useState("")

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
            e.preventDefault()
            const newTag = inputValue.trim()
            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag])
            }
            setInputValue("")
        }

        if (e.key === "Backspace" && !inputValue && value.length > 0) {
            onChange(value.slice(0, -1))
        }
    }

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag))
    }

    return (
        <div className="flex flex-wrap items-center gap-2 border rounded-md p-2 focus-within:ring-2 focus-within:ring-ring">
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-grow border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
            {value.map((tag) => (
                <div
                    key={tag}
                    className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}

        </div>
    )
}
