// Returns an error message string if the combination is invalid, otherwise null.
export const validateCombination = ({ engine, wheels }) => {
    if (engine === 'Electric' && wheels === 'Off-Road') {
        return 'Electric engines are not compatible with Off-Road wheels.'
    }
    return null
}
