import ky from 'ky'

const kyInstance = ky.create({
    parseJson(text) {
        return JSON.parse(text, (key, value) => {
            /**
             * turn the stringified date value into a Date instance
             * which is usually in a column name that ends with "At"
             */
            if (key.endsWith('At')) return new Date(value)
            return value
        })
    },
})

export default kyInstance
