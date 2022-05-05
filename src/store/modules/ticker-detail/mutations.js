export function mutationTicker (state, data) {
  state.ticker = data
}

export function mutationTickerInfo (state, data) {
  state.tickerInfo = data.data || {}
}

export function mutationsTickerAskOrders (state, data) {
  state.tickerAskOrders = data.map(item => {
    return [parseFloat(item[0]), parseFloat(item[1])]
  })
}

export function mutationTickerCap (state, data) {
  state.tickerCap = data
}

export function mutationsTickerBidOrders (state, data) {
  state.tickerBidOrders = data.map(item => {
    return [parseFloat(item[0]), parseFloat(item[1])]
  })
}

export function mutationsTickerFuturesAskOrders (state, data) {
  state.tickerFuturesAskOrders = data.map(item => {
    return [parseFloat(item[0]), parseFloat(item[1])]
  })
}

export function mutationsTickerFuturesBidOrders (state, data) {
  state.tickerFuturesBidOrders = data.map(item => {
    return [parseFloat(item[0]), parseFloat(item[1])]
  })
}

export function mutationsTickerAskRecentOrders (state, data) {
  state.tickerAskRecentOrders = data.map(item => {
    return [parseFloat(item[0]), parseFloat(item[1])]
  })
}

export function mutationsTickerBidRecentOrders (state, data) {
  state.tickerBidRecentOrders = data.map(item => {
    return [parseFloat(item[0]), parseFloat(item[1])]
  })
}

export function mutationsTickerFuturesAskRecentOrders (state, data) {
  state.tickerFuturesAskRecentOrders = data.map(item => {
    return [parseFloat(item[0]), parseFloat(item[1])]
  })
}

export function mutationsTickerFuturesBidRecentOrders (state, data) {
  state.tickerFuturesBidRecentOrders = data.map(item => {
    return [parseFloat(item[0]), parseFloat(item[1])]
  })
}

export function mutationTickerFuturesInfo (state, data) {
  state.tickerFuturesInfo = data
}
