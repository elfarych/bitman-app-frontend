export default function tickerChangeFormatter (value) {
  const prefix = value > 0 ? '+' : ''
  return prefix + value?.toFixed(2) + '%'
}
