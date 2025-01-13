/**
 * Constructs a URL with a query string from the provided path and parameters.
 *
 * @param {string} path - The base path of the URL (e.g., "/verify-email").
 * @param {Record<string, string>} params - An object representing query parameters where the keys are parameter names and values are their corresponding values.
 * @returns {string} The full URL with the query string appended.
 *
 * @example
 * const url = createRedirectUrl('/verify-email', { code: 'abc123', toast: 'Email verification pending' });
 * // Output: "/verify-email?code=abc123&toast=Email+verification+pending"
 */
export function createRedirectUrl(path: string, params: Record<string, string>): string {
    const queryString = new URLSearchParams(params).toString()
    return `${path}?${queryString}`
}