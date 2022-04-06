
export function mutationVolatilityTickers (state, data) {
  state.volatilityTickers = data
}

export function mutationAddVolatilityTicker (state, data) {
  const tickers = state.volatilityTickers.slice(0, 300)
  tickers.unshift(data)

  state.volatilityTickers = tickers
}

export function mutationVolatilityFilter (state, data) {
  state.volatilityFilter = {
    ...state.volatilityFilter,
    ...data
  }
}
