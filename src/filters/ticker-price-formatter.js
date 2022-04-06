export default function tickerPriceFormatter (val) {
  if (val > 1000) {
    return new Intl.NumberFormat('en').format(parseFloat(val))
  } else {
    return val
  }
}

// function valueFormatter (val) {
//   if (val.endsWith('.')) return new Intl.NumberFormat('en').format(val)
//   if (val.endsWith('0')) {
//     const newVal = val.slice(0, val.length - 1)
//     return valueFormatter(newVal)
//   } else {
//     return new Intl.NumberFormat('en').format(val)
//   }
// }
