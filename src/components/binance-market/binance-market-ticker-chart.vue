<template>
<div class="binance-market-ticker-chart relative-position" :id="`ticker-chart-${symbol}${chartKey}`" @click="showChartPopup($event)">
  <small class="absolute-top-right q-mr-xs">{{ days }} дн.</small>
  <div
    class="binance-market-ticker-chart-overlay"
    @click="showChartPopup($event)"
  >
    <q-tooltip v-if="!$mobile">
      Быстрый просмотр
    </q-tooltip>
  </div>
  <q-tooltip v-if="!$mobile">
    Быстрый просмотр
  </q-tooltip>
</div>
</template>

<script>
import config from 'src/config'
import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import { createChart } from 'lightweight-charts'
import { mapMutations } from 'vuex'

export default {
  name: 'binance-market-ticker-chart',
  props: {
    symbol: String,
    chartKey: String,
    change: Number
  },
  data () {
    return {
      days: 0
    }
  },
  methods: {
    ...mapMutations('binanceMarket', ['mutationHoverSymbol']),
    showChartPopup (event) {
      event.preventDefault()
      event.stopPropagation()
      if (this.$mobile) {
        this.$router.push({
          name: 'market-ticker-detail',
          params: { symbol: this.symbol }
        })
      } else this.mutationHoverSymbol(this.symbol)
    },
    async loadCandles () {
      const vm = this
      try {
        return await axios.get(`${config.binanceAPIURI}/api/v3/klines`, {
          params: {
            symbol: `${vm.symbol}USDT`,
            limit: 100,
            interval: '1d'
          }
        }).then(res => {
          const candleData = []
          res.data.forEach(item => {
            const candle = {
              time: item[0],
              value: parseFloat(item[4])
            }
            candleData.push(candle)
          })
          return candleData
        })
      } catch (e) {
        errorHandler(e)
      }
    }
  },
  async mounted () {
    const vm = this
    const element = document.getElementById(`ticker-chart-${this.symbol}${this.chartKey}`)
    const chart = createChart(element, {
      width: element.offsetWidth < 590 ? element.offsetWidth : 590,
      height: vm.$mobile ? 70 : 70,
      layout: {
        backgroundColor: 'transparent',
        textColor: 'rgba(255, 255, 255, 0.9)'
      },
      crosshair: {
        vertLine: {
          visible: false
        },
        horzLine: {
          visible: false
        }
      },
      grid: {
        vertLines: {
          color: 'transparent'
        },
        horzLines: {
          color: 'transparent'
        }
      },
      rightPriceScale: {
        visible: false
      },
      timeScale: {
        visible: false
      }
    })
    const candleSeries = chart.addAreaSeries({
      topColor: vm.change > 0 ? '#16cb85' : '#f6465d',
      bottomColor: '#1e222d',
      lineColor: vm.change > 0 ? '#16cb85' : '#f6465d',
      lineWidth: 1
    })
    const candles = await this.loadCandles()
    candleSeries.setData(candles)
    this.days = candles ? candles.length : 0
  }
}
</script>

<style lang="sass">
.binance-market-ticker-chart
  height: 65px

.tv-lightweight-charts
  position: absolute
  right: -3px

.binance-market-ticker-chart-overlay
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: -1
</style>
