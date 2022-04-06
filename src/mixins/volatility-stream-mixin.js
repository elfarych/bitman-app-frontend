import config from 'src/config'
import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
let stream
export default {
  computed: {

  },
  methods: {
    startVolatilityStream () {
      let streamUrl = ''
      streamUrl = 'binance-tickers-stream'
      try {
        stream = new EventSource(`${config.nodeServerURI}/market/${streamUrl}`)
        stream.onmessage = (event) => {
          const parsedData = JSON.parse(event.data)
          this.createNotify(parsedData).then(() => {})
          this.mutationAddVolatilityTicker(parsedData)
        }
      } catch (e) {
        this.startVolatilityStream()
        errorHandler(e)
      }
    },
    async createNotify (ticker) {
      const vm = this
      let tickerInfo = {}
      try {
        await axios
          .get(`${config.nodeServerURI}/info/coin-market-cap`, {
            params: {
              symbol: ticker.name
            }
          })
          .then(res => {
            tickerInfo = res.data.data
          })
      } catch (e) {
        errorHandler(e)
      }

      this.$q.notify({
        html: true,
        color: 'dark',
        message: `Монета: ${ticker.name} ${ticker.price}<br>
Изменение: <span class="${ticker.positive_change ? 'text-positive' : 'text-negative'} f-w-600">${ticker.positive_change ? '+' : '-'}${ticker.change?.toFixed(2)}%</span> за ${ticker.interval}. <br>
Изменение объема: ${ticker.volume_change?.toFixed(2)}%<br>
Рынки: ${ticker.market}`,
        position: 'top-right',
        class: 'f-w-600 fontsize-13',
        multiLine: true,
        avatar: tickerInfo.logo,
        timeout: 1000000,
        actions: [
          { label: 'Скрыть', color: 'white', class: 'f-w-600 text-capitalize fontsize-12' },
          {
            label: 'Подробнее',
            color: 'dark',
            class: 'text-warning text-capitalize q-ml-sm f-w-600 fontsize-12',
            handler: () => {
              vm.$router.push({ name: 'market-ticker-detail', params: { symbol: ticker.name } })
            }
          }
        ]
      })
    }
  }
}

// Ticker example
// change: 3.194192377495458
// change_per_24h: 12.661
// date: '2022-03-26T18:26:17.840948+06:00'
// id: 578
// interval: '15s'
// link: 'https://www.binance.com/ru/trade/ZIL_USDT?layout=pro'
// market: 'Binance'
// max_per_24h: 0.05883
// min_per_24h: 0.04683
// name: 'ZIL'
// positive_change: true
// price: 0.05686
// volume: 508001773
// volume_change: 5.78230707420048
