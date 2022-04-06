import config from 'src/config'
import errorHandler from 'src/utils/error-handler'

let stream

export async function init ({ dispatch }) {
  await dispatch('loadTickers')
  dispatch('tickersStream')
}

export function tickersStream ({ commit }) {
  try {
    stream = new EventSource(`${config.nodeServerURI}/tickers/tickers-stream`)
    stream.onmessage = (event) => {
      commit('mutationTickers', event.data)
    }
  } catch (e) {
    errorHandler(e)
  }
}
