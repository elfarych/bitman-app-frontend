<template>
<div class="ticker-detail-orders-chart rounded-borders relative-position">
  <div v-if="!$mobile" class="ticker-detail-orders-chart-controls flex no-wrap items-center">

    <q-btn
      v-for="interval in intervalOptions"
      :key="interval"
      :label="interval"
      dense flat no-caps
      :color="chartInterval === interval ? 'secondary' : 'white'"
      size="sm"
      class="q-ml-xs f-w-600"
      @click="setChartInterval(interval)"
    />

    <q-slider
      v-model="range"
      :min="50000"
      :max="2000000"
      :step="50000"
      track-size="10px"
      color="secondary"
      class="q-ml-md"
      style="margin-top: -3px"
    />
    <div class="q-ml-sm text-white-shadow f-w-800">${{ formattedRange }}+</div>
    <q-btn
      icon="refresh"
      flat dense
      size="sm"
      color="secondary"
      :disable="disableLoader"
      @click="reloadOrders"
    >
      <q-tooltip>Обновить заявки</q-tooltip>
    </q-btn>
  </div>
  <div class="transition-1" :style="chart ? `opacity: 1` : `opacity: 0`">
    <div :id="chartElementId" ></div>
  </div>

</div>
</template>

<script>
import { createChart, LineStyle, CrosshairMode } from 'lightweight-charts'
import axios from 'axios'
import config from 'src/config'
import errorHandler from 'src/utils/error-handler'
import { mapActions, mapState } from 'vuex'

let stream
const priceLines = []
export default {
  name: 'ticker-detail-orders-chart',
  computed: {
    ...mapState('tickerDetail', ['tickerAskOrders', 'tickerBidOrders', 'ticker', 'tickerFuturesBidOrders', 'tickerFuturesAskOrders']),
    tickerPrice () {
      return parseFloat(this.ticker.c) || 0
    },
    fixedLen () {
      return this.tickerPrice.toString().split('.')[1]?.length
    },
    asks () {
      const orders = this.market === 'spot' ? this.tickerAskOrders : this.tickerFuturesAskOrders
      return orders.filter(item => item[1] >= this.range / this.tickerPrice)
    },
    bids () {
      const orders = this.market === 'spot' ? this.tickerBidOrders : this.tickerFuturesBidOrders
      return orders.filter(item => item[1] >= this.range / this.tickerPrice)
    },
    symbol () {
      return this.$route.params.symbol || ''
    },
    volumeScale () {
      // if (this.chartInterval === '5m') return 0.89
      // if (this.chartInterval === '15m') return 0.97
      // if (this.chartInterval === '30m') return 0.85
      // if (this.chartInterval === '1h') return 0.93
      // if (this.chartInterval === '4h') return 0.8
      // if (this.chartInterval === '12h') return 0.92
      // if (this.chartInterval === '1d') return 0.7
      // if (this.chartInterval === '1w') return 0.7
      // if (this.chartInterval === '1M') return 0.85

      return 0.88
    },
    formattedRange () {
      return new Intl.NumberFormat('ru').format(this.range)
    },
    timeFormat () {
      if (this.chartInterval === '5m' || this.chartInterval === '15m') {
        return 'HH:mm'
      }

      if (this.chartInterval === '30m' || this.chartInterval === '1h' || this.chartInterval === '4h') {
        return 'DD MMMM'
      }

      return 'MMMM YYYY'
    }
  },
  data () {
    return {
      market: 'spot',
      range: 50000,
      chartElementId: 'ticker-detail-orders-chart-id',
      upColor: '#16cb85',
      downColor: '#f6465d',
      candles: [],
      volumes: [],
      candleSeries: [],
      volumeSeries: [],
      chart: null,
      intervalOptions: ['5m', '15m', '30m', '1h', '4h', '12h', '1d', '1w', '1M'],
      chartInterval: '1h',
      chartSeries: null,
      disableLoader: false
    }
  },
  methods: {
    ...mapActions('tickerDetail', ['loadTickerOrders', 'loadTickerFuturesOrders']),
    reloadOrders () {
      this.disableLoader = true
      this.loadTickerOrders()
      setTimeout(() => {
        this.loadTickerFuturesOrders()
      }, 1500)

      setTimeout(() => {
        this.disableLoader = false
      }, 10000)
    },
    async createChartOrders () {
      const vm = this
      priceLines.forEach(line => {
        vm.candleSeries.removePriceLine(line)
      })
      if (vm.asks && vm.asks.length && vm.bids && vm.bids.length) {
        vm.asks.forEach(item => {
          const priceLine = vm.candleSeries.createPriceLine({
            price: item[0],
            color: parseFloat(item[0]) > vm.tickerPrice ? '#f4465d' : '#2862ff',
            lineWidth: parseFloat(item[1]) * vm.tickerPrice > 3000000 ? 3 : parseFloat(item[1]) * vm.tickerPrice > 1000000 ? 2 : 0.5,
            axisLabelVisible: true,
            lineStyle: LineStyle.Solid,
            title: '$' + vm.getUsdVolume(item[1]) + ' Sell limit'
          })
          priceLines.push(priceLine)
        })

        vm.bids.forEach(item => {
          const priceLine = vm.candleSeries.createPriceLine({
            price: item[0],
            color: '#2862ff',
            lineWidth: parseFloat(item[1]) * vm.tickerPrice > 1000000 ? 2 : 0.5,
            axisLabelVisible: true,
            lineStyle: LineStyle.Solid,
            title: '$' + vm.getUsdVolume(item[1]) + ' Buy limit'
          })
          priceLines.push(priceLine)
        })
      }
    },
    getUsdVolume (val) {
      return this.$numeral((val * this.tickerPrice)).format('(0.00a)').replace('(', '- ').replace(')', '')
    },
    async createChart () {
      const vm = this
      const element = document.getElementById(vm.chartElementId)
      vm.chart = createChart(element, {
        width: element.offsetWidth,
        height: 550,
        layout: {
          backgroundColor: 'transparent',
          textColor: 'rgba(255, 255, 255, 0.9)'
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          vertLine: {
            visible: true,
            labelVisible: false
          },
          horzLine: {
            visible: true
          }
        },
        grid: {
          vertLines: {
            color: '#1e222d'
          },
          horzLines: {
            color: '#1e222d'
          }
        },
        rightPriceScale: {
          visible: true
        },
        timeScale: {
          tickMarkFormatter: (time) => {
            return vm.$dayjs(time).format(vm.timeFormat)
          }
        },
        localization: {
          priceFormatter: function (price) { return parseFloat(price).toFixed(vm.fixedLen) }
        }
      })
      vm.candleSeries = vm.chart.addCandlestickSeries({
        upColor: vm.upColor,
        downColor: vm.downColor,
        borderDownColor: vm.downColor,
        borderUpColor: vm.upColor,
        wickDownColor: vm.downColor,
        wickUpColor: vm.upColor
      })
      vm.volumeSeries = vm.chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume'
        },
        priceScaleId: '',
        scaleMargins: {
          top: vm.volumeScale,
          bottom: 0
        }
      })
    },
    async setChartInterval (val) {
      localStorage.setItem('chartInterval', val)
      this.chartInterval = val
      await this.setChartCandlesData()
    },
    candleStream () {
      const vm = this
      if (stream) stream.close()
      stream = new WebSocket(`${config.binanceStreamURI}/${vm.symbol.toLowerCase()}usdt@kline_${vm.chartInterval}`)
      stream.onmessage = function (event) {
        const data = JSON.parse(event.data)
        // const updatedCandles = vm.candles
        const candle = {
          time: data.k.T, open: data.k.o, high: data.k.h, low: data.k.l, close: data.k.c
        }
        const vol = {
          time: data.k.T, value: data.k.q, color: 'rgba(0, 150, 136, 0.5)'
        }
        vm.candleSeries.update(candle)
        vm.volumeSeries.update(vol)
      }
    },

    async setChartCandlesData () {
      const vm = this
      const klines = await this.loadCandles()
      vm.candles = klines?.candleData
      vm.volumes = klines?.volumeData
      vm.candles.pop()
      vm.volumes.pop()
      vm.candleSeries.setData(vm.candles)
      vm.volumeSeries.setData(vm.volumes)
      this.candleStream()
    },

    async loadCandles () {
      const vm = this
      try {
        return await axios.get(`${config.binanceAPIURI}/api/v3/klines`, {
          params: {
            symbol: `${vm.symbol}USDT`,
            limit: 1000,
            interval: vm.chartInterval
          }
        }).then(res => {
          const candleData = []
          const volumeData = []
          res.data.forEach(item => {
            const candle = {
              time: item[0], open: item[1], high: item[2], low: item[3], close: item[4]
            }
            const vol = {
              time: item[0], value: item[7], color: 'rgba(0, 150, 136, 0.2)'
            }
            candleData.push(candle)
            volumeData.push(vol)
          })
          return {
            candleData,
            volumeData
          }
        })
      } catch (e) {
        errorHandler(e)
      }
    }
  },
  created () {
    if (localStorage.getItem('chartInterval')) this.chartInterval = localStorage.getItem('chartInterval')
  },

  async mounted () {
    setTimeout(async () => {
      await this.createChart()
      await this.setChartCandlesData()
      await this.createChartOrders()
    }, 1000)
  },
  watch: {
    tickerAskOrders () {
      this.createChartOrders()
    },
    range () {
      this.createChartOrders()
    },
    async '$route.params.symbol' () {
      await this.$router.replace({
        query: {
          ...this.$route.query,
          chartMode: undefined
        }
      })
      await this.createChart()
      await this.setChartCandlesData()
    }
  },
  beforeDestroy () {
    if (stream) stream.close()
  }
}

// Stream candle data example
// {
//   "e": "kline",     // Event type
//   "E": 123456789,   // Event time
//   "s": "BNBBTC",    // Symbol
//   "k": {
//   "t": 123400000, // Kline start time
//     "T": 123460000, // Kline close time
//     "s": "BNBBTC",  // Symbol
//     "i": "1m",      // Interval
//     "f": 100,       // First trade ID
//     "L": 200,       // Last trade ID
//     "o": "0.0010",  // Open price
//     "c": "0.0020",  // Close price
//     "h": "0.0025",  // High price
//     "l": "0.0015",  // Low price
//     "v": "1000",    // Base asset volume
//     "n": 100,       // Number of trades
//     "x": false,     // Is this kline closed?
//     "q": "1.0000",  // Quote asset volume
//     "V": "500",     // Taker buy base asset volume
//     "Q": "0.500",   // Taker buy quote asset volume
//     "B": "123456"   // Ignore
// }
// }
</script>

<style lang="sass">
.ticker-detail-orders-chart
  //background: $dark
  height: 550px

.ticker-detail-orders-chart-controls
  position: absolute
  top: -30px
  left: 180px
  width: 500px
</style>
