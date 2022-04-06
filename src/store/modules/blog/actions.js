import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'

export async function loadPosts ({ commit }) {
  try {
    await axios
      .get(`${config.pythonServerURI}/blog/`)
      .then(res => {
        commit('mutationPosts', res.data.results)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadPost ({ commit }, slug) {
  try {
    await axios
      .get(`${config.pythonServerURI}/blog/${slug}/`)
      .then(res => {
        return commit('mutationPost', res.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}
