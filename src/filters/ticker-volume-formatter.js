const numeral = require('numeral')
// require('numeral/locales/en')
// numeral.locale('en')

export default function tickerVolumeFormatter (value) {
  // return new Intl.NumberFormat('en', {
  //   maximumFractionDigits: 0
  // }).format(value)

  return numeral(value).format('($0.00a)').replace('(', '- ').replace(')', '')
}
