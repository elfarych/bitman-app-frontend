// import axios from 'axios'
// import errorHandler from 'src/utils/error-handler'
import config from 'src/config'
import axios from 'axios'
import errorHandler from 'src/utils/error-handler'

let ws

export async function init ({ dispatch }) {
  dispatch('tickerStream')
  dispatch('loadTickerInfo')
  dispatch('loadTickerCap')
  await dispatch('loadTickerFuturesInfo')
  setTimeout(() => {
    dispatch('loadTickerOrders')
  }, 3000)
  setTimeout(() => {
    dispatch('loadRecentOrders')
  }, 4500)
}

export async function loadTickerFuturesInfo ({ commit }) {
  const vm = this
  commit('mutationTickerFuturesInfo', null)
  try {
    await axios
      .get('https://fapi.binance.com/fapi/v1/ticker/price', {
        params: {
          symbol: vm.$router.currentRoute.params.symbol.toUpperCase() + 'USDT'
        }
      })
      .then(res => {
        commit('mutationTickerFuturesInfo', true)
      })
  } catch (e) {

  }
}

export async function tickerStream ({ commit }, close = false) {
  const vm = this

  if (ws) {
    commit('mutationTicker', {})
    ws.close()
    ws = undefined
  }
  ws = new WebSocket(`wss://stream.binance.com:9443/ws/${vm.$router.currentRoute.params.symbol.toLowerCase()}usdt@ticker`)
  ws.onmessage = function (event) {
    commit('mutationTicker', JSON.parse(event.data))
  }
}

export async function loadTickerInfo ({ commit, dispatch }) {
  const vm = this
  commit('mutationTickerInfo', {})
  try {
    await axios
      .get(`${config.nodeServerURI}/info/coin-market-cap`, {
        params: {
          symbol: vm.$router.currentRoute.params.symbol.toUpperCase()
        }
      })
      .then(res => {
        commit('mutationTickerInfo', res.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadTickerCap ({ commit, dispatch }) {
  const vm = this
  commit('mutationTickerInfo', {})
  try {
    await axios
      .get(`${config.nodeServerURI}/info/market-capitalization`, {
        params: {
          symbol: vm.$router.currentRoute.params.symbol.toUpperCase()
        }
      })
      .then(res => {
        commit('mutationTickerCap', res.data.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadTickerOrders ({ commit }) {
  const vm = this
  commit('mutationsTickerAskOrders', [])
  commit('mutationsTickerBidOrders', [])
  try {
    await axios
      .get('https://api.binance.com/api/v3/depth', {
        params: {
          limit: 5000,
          symbol: vm.$router.currentRoute.params.symbol + 'USDT'
        }
      })
      .then(res => {
        commit('mutationsTickerAskOrders', res.data.asks)
        commit('mutationsTickerBidOrders', res.data.bids)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadRecentOrders ({ commit }) {
  const vm = this
  commit('mutationsTickerAskRecentOrders', [])
  commit('mutationsTickerBidRecentOrders', [])
  try {
    await axios
      .get('https://api.binance.com/api/v3/trades', {
        params: {
          limit: 1000,
          symbol: vm.$router.currentRoute.params.symbol + 'USDT'
        }
      })
      .then(res => {
        const asks = [] // sell
        const bids = [] // buy

        res.data.forEach(item => {
          if (item.isBuyerMaker) {
            bids.push([item.price, item.qty])
          } else if (!item.isBuyerMaker) {
            asks.push([item.price, item.qty])
          }
        })

        commit('mutationsTickerAskRecentOrders', asks)
        commit('mutationsTickerBidRecentOrders', bids)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadTickerFuturesOrders ({ commit }) {
  const vm = this
  commit('mutationsTickerFuturesAskOrders', [])
  commit('mutationsTickerFuturesBidOrders', [])
  try {
    await axios
      .get('https://fapi.binance.com/fapi/v1/depth', {
        params: {
          limit: 1000,
          symbol: vm.$router.currentRoute.params.symbol + 'USDT'
        }
      })
      .then(res => {
        commit('mutationsTickerFuturesAskOrders', res.data.asks)
        commit('mutationsTickerFuturesBidOrders', res.data.bids)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadFuturesRecentOrders ({ commit }) {
  const vm = this
  commit('mutationsTickerFuturesAskRecentOrders', [])
  commit('mutationsTickerFuturesBidRecentOrders', [])
  try {
    await axios
      .get('https://fapi.binance.com/fapi/v1/trades', {
        params: {
          limit: 1000,
          symbol: vm.$router.currentRoute.params.symbol + 'USDT'
        }
      })
      .then(res => {
        const asks = [] // sell
        const bids = [] // buy

        res.data.forEach(item => {
          if (item.isBuyerMaker) {
            bids.push([item.price, item.qty])
          } else if (!item.isBuyerMaker) {
            asks.push([item.price, item.qty])
          }
        })

        commit('mutationsTickerFuturesAskRecentOrders', asks)
        commit('mutationsTickerFuturesBidRecentOrders', bids)
      })
  } catch (e) {
    errorHandler(e)
  }
}
