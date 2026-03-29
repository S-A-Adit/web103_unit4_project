import { COLOR_OPTIONS, WHEEL_OPTIONS, ENGINE_OPTIONS, INTERIOR_OPTIONS } from './options.js'

const BASE_PRICE = 25000

export const getOptionPrice = (options, value) => {
    const match = options.find(o => o.value === value)
    return match ? match.price : 0
}

export const calcTotalPrice = ({ color, wheels, engine, interior }) => {
    return (
        BASE_PRICE +
        getOptionPrice(COLOR_OPTIONS, color) +
        getOptionPrice(WHEEL_OPTIONS, wheels) +
        getOptionPrice(ENGINE_OPTIONS, engine) +
        getOptionPrice(INTERIOR_OPTIONS, interior)
    )
}
