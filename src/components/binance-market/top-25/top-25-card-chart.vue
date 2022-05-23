<template>
  <div class="binance-market-ticker-chart relative-position" :id="`ticker-chart-${symbol}${chartKey}`" @click="showChartPopup($event)">
    <small class="absolute-top-right q-mr-xs">
    <span v-if="startEndDifference" :class="startEndDifference > 0 ? 'text-positive' : 'text-negative'" class="f-w-800 q-mr-xs">
      {{ startEndDifference > 0 ? '+' : '' }}{{ startEndDifference.toFixed(2) }}%
    </span>
      за {{ intervalName }}
    </small>

    <div class="absolute-bottom-right q-mr-xs flex no-wrap text-right" style="z-index: 1000; bottom: -3px">
      <small>мин <span class="f-w-800">{{ periodMinValue || '' }}</span></small>
      <small class="q-ml-md">макс <span class="f-w-800">{{ periodMaxValue || '' }}</span></small>
    </div>
    <div
      class="binance-market-ticker-chart-overlay"
      @click="showChartPopup($event)"
    >
      <q-tooltip v-if="!$mobile">
        Быстрый просмотр
      </q-tooltip>
    </div>

    <q-skeleton v-if="!candles.length" class="absolute-full"/>
  </div>
</template>

<script>
import config from 'src/config'
import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import { createChart } from 'lightweight-charts'
import { mapMutations } from 'vuex'
import getDifferencePercent from 'src/helpers/difference-precent'

export default {
  name: 'top-25-card-chart',
  props: {
    symbol: String,
    chartKey: String,
    change: Number
  },
  computed: {
    startEndDifference () {
      if (!this.firstCandle && !this.lastCandle) return ''
      return getDifferencePercent(this.firstCandle.open, this.lastCandle.close) || ''
    },
    periodMaxValue () {
      return new Intl.NumberFormat('us', { maximumFractionDigits: 15 }).format(Math.max(...this.candleHighs))
    },
    periodMinValue () {
      return new Intl.NumberFormat('us', { maximumFractionDigits: 15 }).format(Math.min(...this.candleMins))
    }
  },
  data () {
    return {
      days: 0,
      candlesCount: 53,
      candlesInterval: '1w',
      intervalName: '1 год',
      firstCandle: null,
      lastCandle: null,
      candles: [],
      candleHighs: [],
      candleMins: []
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
            limit: vm.candlesCount,
            interval: vm.candlesInterval
          }
        }).then(res => {
          const candleData = []
          res.data.forEach((item, index, arr) => {
            const candle = {
              time: item[0],
              value: parseFloat(index === 0 ? item[1] : item[4]),
              open: parseFloat(item[1]),
              high: parseFloat(item[2]),
              low: parseFloat(item[3]),
              close: parseFloat(item[4])
            }

            if (index === 0) vm.firstCandle = candle
            else if (index === arr.length - 1) vm.lastCandle = candle
            candleData.push(candle)
            vm.candleHighs.push(candle.high)
            vm.candleMins.push(candle.low)
          })
          return candleData
        })
      } catch (e) {
        errorHandler(e)
      }
    },
    async createChart () {
      const vm = this
      const element = document.getElementById(`ticker-chart-${this.symbol}${this.chartKey}`)
      const chart = createChart(element, {
        width: element.offsetWidth < 590 ? element.offsetWidth : 590,
        height: vm.$mobile ? 70 : 70,
        layout: {
          backgroundColor: 'transparent',
          textColor: 'rgba(255, 255, 255, 0.9)'
        },
        timeScale: {
          visible: false,
          barSpacing: element.offsetWidth / vm.candlesCount
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
        }
      })
      const candleSeries = chart.addAreaSeries({
        // topColor: vm.change > 0 ? '#16cb85' : '#f6465d',
        topColor: '#00abe7',
        bottomColor: '#1e222d',
        // lineColor: vm.change > 0 ? '#16cb85' : '#f6465d',
        lineColor: '#00abe7',
        lineWidth: 0.5
      })
      vm.candles = await this.loadCandles()
      candleSeries.setData(vm.candles)
      this.days = vm.candles ? vm.candles.length : 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.createChart()
    }, 3000)
  },
  watch: {
    // '$route' () {
    //   this.createChart()
    // }
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
  z-index: 999

</style>
