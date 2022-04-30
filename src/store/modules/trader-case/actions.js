import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'
import notifier from 'src/utils/notifier'
import getJWT from 'src/utils/get-jwt'

export async function loadCases ({ commit }) {
  const jwt = getJWT()
  try {
    await axios
      .get(`${config.socialServerURI}/case/`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => {
        commit('mutationCases', res.data.results)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function createCase ({ dispatch }, payload) {
  // payload example { data: {} }
  const jwt = getJWT()
  try {
    await axios
      .post(`${config.socialServerURI}/case/create/`,
        {
          ...payload.data
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      .then(res => {
        notifier('Портфель успешно создан.', 'positive')
        dispatch('loadCases')
      })
  } catch (e) {
    notifier('Не удалось создать портфель.', 'negative')
    errorHandler(e)
  }
}

export async function updateCase ({ dispatch }, payload) {
  // payload example { caseId: 2, data: {} }
  const jwt = getJWT()
  try {
    await axios
      .patch(`${config.socialServerURI}/case/update/${payload.caseId}`,
        {
          ...payload.data
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      .then(res => {
        notifier('Портфель успешно обновлен.', 'positive')
        dispatch('loadCases')
      })
  } catch (e) {
    notifier('Не удалось обновить портфель.', 'negative')
    errorHandler(e)
  }
}

export async function deleteCase ({ dispatch }, id) {
  const jwt = getJWT()
  try {
    await axios
      .delete(`${config.socialServerURI}/case/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => {
        notifier('Портфель успешно удален.', 'positive')
        dispatch('loadCases')
      })
  } catch (e) {
    notifier('Не удалось удалить портфель.', 'negative')
    errorHandler(e)
  }
}

export async function createCaseToken ({ dispatch }, payload) {
  // payload example { data: {} }
  const jwt = getJWT()
  try {
    await axios
      .post(`${config.socialServerURI}/case_token/create/`,
        { ...payload.data },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      .then(res => {
        notifier(`Монета ${payload.data.symbol} успешно добавлена в портфель.`, 'positive')
        dispatch('loadCases')
      })
  } catch (e) {
    notifier('Не удалось добавить монету в портфель.', 'negative')
    errorHandler(e)
  }
}

export async function updateCaseToken ({ dispatch }, payload) {
  // payload example { caseId: 2, data: {} }
  const jwt = getJWT()
  try {
    await axios
      .patch(`${config.socialServerURI}/case_token/update/${payload.caseId}`,
        {
          ...payload.data
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      .then(res => {
        notifier('Портфель обновлен.', 'negative')
        dispatch('loadCases')
      })
  } catch (e) {
    notifier('Не удалось обновить портфель.', 'negative')
    errorHandler(e)
  }
}

export async function deleteCaseToken ({ dispatch }, id) {
  const jwt = getJWT()
  try {
    await axios
      .delete(`${config.socialServerURI}/case_token/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => {
        notifier('Монета удалена из портфеля.')
        dispatch('loadCases')
      })
  } catch (e) {
    notifier('Не удалось удалить монету из портфеля.', 'negative')
    errorHandler(e)
  }
}
