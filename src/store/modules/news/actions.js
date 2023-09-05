import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'

export async function loadNews ({ commit }) {
  try {
    await axios
      .get(`${config.newsServerURI}/news/`)
      .then(res => {
        commit('mutationNews', res.data?.results)
      })
  } catch (e) {
    errorHandler(e)
  }
}
