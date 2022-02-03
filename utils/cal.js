export const calculateTDS = (amount) => {
    const tdsAmount = parseInt(amount) * 0.01
    return tdsAmount.toFixed(3)
}

export const calculateExchangeFee = (amount, exchangeFee) => {
    console.log(exchangeFee)
    const fee = (parseInt(amount) * parseFloat(exchangeFee)) / 100
    return fee.toFixed(3)
}

export const totalTax = (tds, fee) => {
    const result = parseFloat(tds) + parseFloat(fee);
    return result.toFixed(3)
}