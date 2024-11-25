import en from './messages/en.json'

type Messages = typeof en

declare global {
    // Use type safe message keys with `next-intl`
    interface IntlMessages extends Messages {}

    // re-Define a generic SearchParams type that accepts a generic
    type GenericSearchParams<
        K extends string = string,
        V = string | string[] | undefined,
    > = {
        [key in K]: V
    }
}
