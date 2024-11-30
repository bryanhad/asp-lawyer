import { Poppins, Source_Serif_4 } from 'next/font/google'

export const sourceSerif4 = Source_Serif_4({
    subsets: ['latin'],
    weight: ['300'],
    display: 'swap',
})

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '600']
})
