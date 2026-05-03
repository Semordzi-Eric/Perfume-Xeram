export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
    currencyDisplay: 'narrowSymbol',
  })
    .format(value)
    .replace(/^(\D+)/, '$1 ')
    .replace(/\s+/, ' ')
}
