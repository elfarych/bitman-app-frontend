import config from 'src/config'
import axios from 'axios'

export function init ({ dispatch }) {
  dispatch('loadSlides')
  dispatch('loadSiteSetting')
}

export async function loadSlides ({ commit }) {
  try {
    await axios
      .get(`${config.pythonServerURI}/mainapp/slides/`)
      .then(res => {
        commit('mutationSlides', res.data.results)
      })
  } catch (e) {

  }
}

export async function loadDonateWallets ({ commit }) {
  try {
    await axios
      .get(`${config.pythonServerURI}/mainapp/donate/`)
      .then(res => {
        commit('mutationDonateWallets', res.data.results)
      })
  } catch (e) {

  }
}

export async function loadSiteSetting ({ commit }) {
  try {
    await axios
      .get(`${config.pythonServerURI}/mainapp/siteinfo/`)
      .then(res => {
        commit('mutationSiteInfo', res.data.results || [])
      })
  } catch (e) {

  }
}

export async function loadRoadmap ({ commit }) {
  try {
    await axios
      .get(`${config.pythonServerURI}/mainapp/roadmap/`)
      .then(res => {
        commit('mutationRoadmap', res.data.results)
      })
  } catch (e) {

  }
}
