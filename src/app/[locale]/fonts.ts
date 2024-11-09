import { Source_Serif_4 } from 'next/font/google'
import localFont from 'next/font/local'

export const geistSans = localFont({
    src: '../fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
export const geistMono = localFont({
    src: '../fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})
export const sourceSerif4 = Source_Serif_4({
    subsets: ['latin'],
    weight: ['300'],
    display: 'swap',
})
