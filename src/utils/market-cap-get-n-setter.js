import axios from 'axios'
import config from 'src/config'
import errorHandler from 'src/utils/error-handler'

export default async function marketCapGetEndSetter () {
  try {
    await axios('https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list')
      .then(async res => {
        await axios.post(`${config.nodeServerURI}/info/market-capitalization`, {
          data: res.data.data
        })
      })
  } catch (e) {
    errorHandler(e)
  }
}
