export function mutationSymbols (state, data) {
  const formattedData = data
    .filter(item => {
      const symbol = item.symbol.replace('USDT', '')
      return !symbol.endsWith('DOWN') &&
        !symbol.endsWith('UP') &&
        !symbol.includes('BTCDOM') &&
        symbol !== 'BUSD' &&
        symbol !== 'USDC' &&
        symbol !== 'USDP' &&
        symbol !== 'UST' &&
        symbol !== 'TUSD' &&
        symbol !== 'SUSD'
    })
    .map(item => {
      if (parseFloat(item.lastPrice)) {
        return {
          logo: item.logo,
          symbol: item.symbol,
          lastPrice: parseFloat(item.lastPrice),
          priceChange: parseFloat(item.priceChange),
          priceChangePercent: parseFloat(item.priceChangePercent),
          volume: parseFloat(item.volume)
        }
      }
      return null
    })

  state.symbols = formattedData.filter(item => !!item)
}

export function mutationFutureSymbols (state, data) {
  const formattedData = data
    .filter(item => {
      const symbol = item.symbol.replace('USDT', '')
      return !symbol.includes('BTCDOM')
    })
    .map(item => {
      if (parseFloat(item.lastPrice)) {
        return {
          symbol: item.symbol.replace('1000', ''),
          lastPrice: parseFloat(item.lastPrice),
          priceChangePercent: parseFloat(item.priceChangePercent),
          volume: parseFloat(item.volume)
        }
      }
      return null
    })

  state.futureSymbols = formattedData.filter(item => !!item).sort((a, b) => b.volume - a.volume)
}

export function mutationHoverSymbol (state, data) {
  state.hoverSymbol = data
}
