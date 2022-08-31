import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'

export async function loadEvents ({ commit }) {
  try {
    await axios
      .get(`${config.newsServerURI}/events/`)
      .then(res => {
        commit('mutationEvents', res.data.results)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadCategories ({ commit }) {
  try {
    await axios
      .get(`${config.newsServerURI}/categories/`)
      .then(res => {
        commit('mutationCategories', res.data.results)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export function init ({ dispatch }) {
  Promise.all([
    dispatch('loadEvents'),
    dispatch('loadCategories')
  ]).then(() => {})
}
