import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'
import { dayjs } from 'boot/day'

export function init ({ dispatch }) {
  dispatch('loadCoindarHomeEvents')
}

export async function loadCoindarHomeEvents ({ commit }) {
  try {
    await axios
      .get(`${config.nodeServerURI}/news/coindar_news`, {
        params: {
          page_size: 25,
          filter_date_start: dayjs().format('YYYY-MM-DD')
        }
      })
      .then(res => {
        commit('mutationCoindarTopNews', res.data?.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}
