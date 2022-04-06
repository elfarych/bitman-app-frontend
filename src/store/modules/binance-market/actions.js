import axios from 'axios'
import errorHandler from 'src/utils/error-handler'
import config from 'src/config'

export function init ({ dispatch }) {
  dispatch('loadSymbols')
  setTimeout(() => {
    dispatch('loadFutureSymbols')
  }, 3000)
}

export async function loadSymbols ({ commit, dispatch, state }) {
  try {
    await axios
      .get(`${config.binanceAPIURI}/api/v3/ticker/24hr`)
      .then(res => {
        commit('mutationSymbols', res.data.filter(item => item.symbol.endsWith('USDT') && !item.symbol.includes('DOWN')))
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadFutureSymbols ({ commit, dispatch, state }) {
  try {
    await axios
      .get('https://fapi.binance.com/fapi/v1/ticker/24hr')
      .then(res => {
        commit('mutationFutureSymbols', res.data.filter(item => item.symbol.endsWith('USDT')))
      })
  } catch (e) {
    errorHandler(e)
  }
}
