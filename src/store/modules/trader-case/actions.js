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
      .patch(`${config.socialServerURI}/case/update/${payload.caseId}/`,
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

export async function deleteCase ({ dispatch }, payload) {
  // payload example { caseId: 2, data: {} }
  const jwt = getJWT()
  try {
    await axios
      .delete(`${config.socialServerURI}/case/delete/${payload.caseId}/`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(async res => {
        await dispatch('updateTokensAndOrders')
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
        const data = payload.data
        data.token = res.data.id
        dispatch('createCaseTokenOrder', { data })
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
      .patch(`${config.socialServerURI}/case_token/update/${payload.caseId}/`,
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
      .delete(`${config.socialServerURI}/case_token/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(async res => {
        await dispatch('updateTokensAndOrders')
        notifier('Монета удалена из портфеля.')
        dispatch('loadCases')
      })
  } catch (e) {
    notifier('Не удалось удалить монету из портфеля.', 'negative')
    errorHandler(e)
  }
}

export async function createCaseTokenOrder ({ dispatch }, payload) {
  // payload example { data: {} }
  const jwt = getJWT()
  try {
    await axios
      .post(`${config.socialServerURI}/case_token_order/create/`,
        { ...payload.data },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      .then(res => {
        notifier(`Транзакция по монете ${payload.data.symbol} создана.`, 'positive')
        dispatch('loadCases')
      })
  } catch (e) {
    notifier('Не удалось добавить транзакцию.', 'negative')
    errorHandler(e)
  }
}

export async function deleteCaseTokenOrder ({ dispatch }, id) {
  // payload example { data: {} }
  const jwt = getJWT()
  try {
    await axios
      .delete(`${config.socialServerURI}/case_token_order/delete/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      .then(async res => {
        notifier('Транзакция удалена.', 'positive')
        await dispatch('updateTokensAndOrders')
        dispatch('loadCases')
      })
  } catch (e) {
    notifier('Не удалось удалить транзакцию.', 'negative')
    errorHandler(e)
  }
}

export async function updateTokensAndOrders () {
  try {
    await axios.get(`${config.socialServerURI}/update_cases/`)
  } catch (e) {
    errorHandler(e)
  }
}
