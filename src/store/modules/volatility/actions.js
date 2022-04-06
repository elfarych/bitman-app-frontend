import axios from 'axios'
import errorHandler from 'src/utils/error-handler'
import config from 'src/config'

export function init ({ dispatch }) {
  Promise.all([
    dispatch('loadVolatilityTickers')
  ]).then(() => {})
}

export async function loadVolatilityTickers ({ commit, dispatch, state }) {
  const filter = localStorage.getItem('filters') ? JSON.parse(localStorage.getItem('filters')) : undefined
  let positiveChange
  if (filter) {
    if (filter.showPositiveChange && !filter.showNegativeChange) positiveChange = true
    else if (!filter.showPositiveChange && filter.showNegativeChange) positiveChange = false
  }

  try {
    await axios
      .get(`${config.pythonServerURI}/market/tickers/`, {
        params: {
          limit: 100,
          positive_change: positiveChange,
          interval: filter?.interval ? filter.interval : undefined,
          change_min: filter ? filter.changePercent : 5,
          offset: 0
        }
      })
      .then(res => {
        commit('mutationVolatilityTickers', res.data.results)
      })
  } catch (e) {
    errorHandler(e)
  }
}
