import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'

export function init ({ dispatch }) {
  dispatch('loadGlobalData')
}

export async function loadGlobalData ({ commit }) {
  try {
    await axios
      .get(`${config.coinGeckoAPI}/v3/global`)
      .then(res => {
        commit('mutationGlobalData', res.data.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}
