import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'

export function init ({ dispatch }) {
  dispatch('loadGlobalData')
  dispatch('loadCoinCategories')
}

export async function loadGlobalData ({ commit }) {
  try {
    await axios
      .get(`${config.coinGeckoAPI}/global`)
      .then(res => {
        commit('mutationGlobalData', res.data.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadCoinCategories ({ commit }) {
  try {
    await axios
      .get(`${config.coinGeckoAPI}/coins/categories`)
      .then(res => {
        commit('mutationCoinCategories', res.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}
