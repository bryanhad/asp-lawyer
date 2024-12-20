import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple class names using `clsx` and `tailwind-merge`.
 *
 * This function takes multiple class names and combines them,
 * resolving any conflicts with Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Creates a debounced version of a function, delaying its execution.
 *
 * The function will only be called after the specified delay has passed
 * without it being called again. Useful for optimizing repeated actions.
 *
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns A debounced version of the input function.
 */

export function debounce<T>(
    func: (arg: T) => void,
    delay: number,
): (arg: T) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (arg: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(arg), delay);
    };
}
/**
 * Capitalizes the first letter of a string.
 *
 * Converts the first character of the input string
 * to uppercase, leaving the rest of the string unchanged.
 *
 * @param str - The string to capitalize.
 * @returns The input string with the first letter capitalized.
 */
export function capitalizeFirstLetter(str: string): string {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Cleans a string by removing all special characters.
 */
export function cleanString(str: string): string {
    return str.replace(/[^a-zA-Z0-9\s]/g, '')
}


export function getNameInitial(name:string) {
    const formattedName = name.replace(/\s+/g, ' ').trim()

    const words = formattedName.split(' ')

    if (words.length === 1) {
      return name[0]
    }
    return `${words[0][0]}${words[1][0]}`
}

export function formatDateToLocale(
    date: Date,
    locales: Intl.LocalesArgument = "id-ID",
    short?: boolean
) {
    return new Date(date).toLocaleDateString(locales, {
        year: "numeric",
        month: short ? "2-digit" : "long",
        day: "numeric",
        weekday: short ? undefined : "long",
    })
}