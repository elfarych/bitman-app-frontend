import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'

export async function loadArbitrationResults ({ commit }) {
  try {
    await axios
      .get(`${config.arbitrationServerURI}/results`)
      .then(res => {
        commit('mutationArbitrationResults', res.data.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}
