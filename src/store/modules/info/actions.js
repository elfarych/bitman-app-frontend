import errorHandler from 'src/utils/error-handler'
import axios from 'axios'

// import config from 'src/config'

export async function init ({ dispatch }) {
  await dispatch('loadVix')
}

export async function loadVix ({ commit }) {
  try {
    axios
      .get('https://api.gatebigdata.com/v2/data/vix/pic/ts/week?url=vix/pic/ts')
      .then(res => {
        const array = res.data.data[2].data
        const vix = array[array.length - 1][0]

        commit('mutationVix', vix)
        commit('mutationVixWeekData', res.data.data)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadLiquidity ({ commit }, interval = '24H') {
  const symbol = this.$router.currentRoute.params.symbol
  try {
    axios
      .get(`https://api.gatebigdata.com/v2/data/burst/bourse/coin_type/${symbol}/ts/${interval}?url=burst/bourse/coin_type`)
      .then(res => {
        if (res.data?.data[1]) {
          const totalSum = parseFloat(res.data.data[1].data[res.data.data[1].data.length - 1][0])
          const longs = parseFloat(res.data.data[2].data[res.data.data[2].data.length - 1][0])
          const shorts = parseFloat(res.data.data[3].data[res.data.data[3].data.length - 1][0])
          commit('mutationLiquidity', { totalSum, longs, shorts })
        }
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadOpenInterest ({ commit }) {
  const symbol = this.$router.currentRoute.params.symbol
  try {
    axios
      .get(`https://api.gatebigdata.com/v3/data/hold/coin_type/${symbol}/ex/Gate/ts/24H/cy/ALL?url=fetchGrayscaleAll`)
      .then(res => {
        const totalSum = parseFloat(res.data.data.hold_dtl[1].data[res.data.data.hold_dtl[1].data.length - 1][0])
        const change = parseFloat(res.data.data.hold_dtl[2].data[res.data.data.hold_dtl[2].data.length - 1][0])
        commit('mutationOpenInterest', { totalSum, change })
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadCashFlow ({ commit }) {
  const symbol = this.$router.currentRoute.params.symbol
  try {
    axios
      .get(`https://api.gatebigdata.com/v3/data/fund/coin_type/${symbol}/ts/1D/cs/spot?url=fund/coin_type`)
      .then(res => {
        const data = []
        const resData = res.data.data.fund_time_flow_dtl

        if (resData?.[0]?.data?.[0]) {
          for (let i = 0; i < 14; i++) {
            const dataObj = {}
            dataObj.time = resData[0].data[i]?.[0]
            dataObj.inFlow = parseInt(resData[1].data[i]?.[0])
            dataObj.outFlow = parseInt(resData[2].data[i]?.[0])
            dataObj.netInflow = parseInt(resData[3].data[i]?.[0])

            data.push(dataObj)
          }
        }

        commit('mutationCashFlow', data)
      })
  } catch (e) {
    errorHandler(e)
  }
}

export async function loadHodlers ({ commit }, symbol = null) {
  if (!symbol) symbol = this.$router.currentRoute.params.symbol
  try {
    axios
      .get(`https://api.gatebigdata.com/v3/data/cash/coin_type/${symbol}?url=cash/coin_type`)
      .then(res => {
        const data = []
        const resData = res.data.data.cash_dist_dtl
        if (resData?.[0]?.data[0]) {
          for (let i = 0; i < 100; i++) {
            const dataObj = {}
            dataObj.rating = resData[0].data[i]?.[0]
            dataObj.tokens = parseInt(resData[1].data[i]?.[0])
            dataObj.percent = parseFloat(resData[2].data[i]?.[0])
            dataObj.oneDayChange = parseInt(resData[3].data[i]?.[0])
            dataObj.weeklyChange = parseInt(resData[3].data[i]?.[1])
            dataObj.address = resData[4].data[i]?.[0]

            data.push(dataObj)
          }
        }

        commit('mutationHodlers', data)
      })
  } catch (e) {
    errorHandler(e)
  }
}
