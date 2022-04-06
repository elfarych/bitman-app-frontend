export default function () {
  return {
    volatilityTickers: [],
    volatilityFilter: {
      interval: '',
      showPositiveChange: true,
      showNegativeChange: true,
      changePercent: 3
    },
    markets: [
      'Gate-Vol', 'Gate-Futures-Vol', 'Binance-Vol', 'Binance-Futures-Vol'
    ]
  }
}
