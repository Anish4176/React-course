export function centsToDollar(priceCents){
    return `$${(priceCents / 100).toFixed(2)}`
}