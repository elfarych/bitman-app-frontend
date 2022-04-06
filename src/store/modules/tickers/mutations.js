export function mutationTickers (state, data) {
  state.tickers = JSON.parse(data)
}
