import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'

export async function loadUser ({ commit, dispatch }) {
  const jwt = localStorage.getItem('jwt')
  try {
    await axios
      .get(`${config.socialServerURI}/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => {
        commit('mutationUser', res.data)
        dispatch('getTrader')
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function getTrader ({ commit, dispatch }) {
  const jwt = localStorage.getItem('jwt')
  try {
    await axios
      .get(`${config.socialServerURI}/trader/me/`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => {
        if (res.data.count) {
          commit('mutationTrader', res.data.results[0])
        } else {
          dispatch('createTrader')
        }
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function createTrader ({ commit }) {
  const jwt = localStorage.getItem('jwt')
  try {
    await axios
      .post(`${config.socialServerURI}/trader/create/`, {

      }, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => {
        commit('mutationTrader', res.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function updateTrader ({ commit, state }, payload) {
  const jwt = localStorage.getItem('jwt')
  try {
    await axios
      .patch(`${config.socialServerURI}/trader/update/${state.trader.id}/`, {
        ...payload
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => {
        debugger
        commit('mutationTrader', res.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}
