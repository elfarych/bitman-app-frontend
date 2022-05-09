const numeral = require('numeral')

export default function bigNumberFormatter (value) {
  return numeral(value).format('($0.00a)').replace('(', '- ').replace(')', '')
}
