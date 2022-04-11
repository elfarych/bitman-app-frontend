<template>
<div
  class="widget-liquidity rounded-borders bg-dark blue-shadow q-py-md relative-position q-pb-xl q-pt-md"
  :key="`${fullscreen}` "
  :style="fullscreen ? '' : 'height: 370px'"
  :class="fullscreen ? 'widget-liquidity-chart-full-screen' : ''"
>
  <div class="absolute-top-right q-ma-md">
<!--    <q-btn-->
<!--      icon-right="refresh"-->
<!--      flat dense no-caps-->
<!--      :disable="disableReload"-->
<!--      class="q-ml-xs"-->
<!--      @click="reloadData"-->
<!--    />-->
    <q-btn
      :icon-right="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
      flat dense no-caps
      class="q-ml-xs"
      @click="setScreen"
    />
  </div>

  <div class="text-subtitle1 f-w-800 text-center">Ликвидации</div>
  <div class="text-center">по данным топовых бирж</div>
  <div
    :id="chartId"
    class="transition-1 fit"
    :style="`opacity: ${chart ? 1 : 0}`"
  ></div>

  <div class="q-mt-sm   absolute-bottom-left q-pa-md">
    <div>Дата: {{ activeDate }}</div>

    <div class="flex q-mt-sm">
      <div class="flex  items-center">
        <span class="block q-mr-xs bg-positive" style="width: 10px; height: 10px; border-radius: 4px; margin-top: -1px"></span>
        Длинные <span class="f-w-800 q-ml-xs">{{ activeLongFormatted }}</span>
      </div>
      <div class="flex  items-center q-ml-md">
        <span class="block q-mr-xs bg-negative q-ml-sm" style="width: 10px; height: 10px; border-radius: 4px; margin-top: -1px"></span>
        Короткие <span class="f-w-800 q-ml-xs">{{ activeShortFormatted }}</span>
      </div>
      <div class="flex  items-center q-ml-md">
        <span class="block q-mr-xs bg-secondary" style="width: 10px; height: 10px; border-radius: 4px; margin-top: -1px"></span>
        Всего <span class="f-w-800 q-ml-xs">{{ activeTotalFormatted }}</span>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import { createChart, PriceScaleMode } from 'lightweight-charts'

export default {
  name: 'widget-liquidity',
  computed: {
    activeLongFormatted () {
      return this.$numeral(this.activeLong).format(this.dataFormat).toUpperCase()
    },
    activeShortFormatted () {
      return this.$numeral(this.activeShort).format(this.dataFormat).toUpperCase()
    },
    activeTotalFormatted () {
      return this.$numeral(this.activeTotal).format(this.dataFormat).toUpperCase()
    }
  },
  data () {
    return {
      liquidationData: { longs: [], shorts: [], totals: [] },
      chartId: 'widget-liquidity-chart',
      chart: null,
      fullscreen: false,
      activeLong: 0,
      activeShort: 0,
      activeTotal: 0,
      activeDate: 'текущий день',
      dataFormat: '($0.0a)',
      disableReload: false
    }
  },
  methods: {
    setScreen () {
      this.chart = null
      this.fullscreen = !this.fullscreen
    },

    async reloadData () {
      const vm = this
      vm.disableReload = true
      setTimeout(() => {
        vm.disableReload = false
      }, 5000)
    },

    async loadLiquidations () {
      const vm = this

      try {
        await axios
          .get('https://api.gatebigdata.com/v3/data/burst/coin_type/ALL/ts/24H/ex/ALL/cy/ALL?url=fetchBurstDataAll')
          .then(res => {
            const data = res.data.data.burst_calendar_dtl
            if (data) {
              vm.liquidationData.longs = data[1].data.map((item, index) => {
                return {
                  time: data[0].data[index][0],
                  value: item[0]
                }
              })
              vm.activeLong = vm.liquidationData.longs[vm.liquidationData.longs.length - 1].value
              vm.liquidationData.shorts = data[2].data.map((item, index) => {
                return {
                  time: data[0].data[index][0],
                  value: item[0]
                }
              })
              vm.activeShort = vm.liquidationData.shorts[vm.liquidationData.shorts.length - 1].value
              vm.liquidationData.totals = data[3].data.map((item, index) => {
                return {
                  time: data[0].data[index][0],
                  value: item[0]
                }
              })
              vm.activeTotal = vm.liquidationData.totals[vm.liquidationData.totals.length - 1].value
            }
          })
      } catch (e) {
        errorHandler(e)
      }
    },

    createChart () {
      const vm = this
      const element = document.getElementById(vm.chartId)
      const width = element.offsetWidth
      const height = element.offsetHeight - 70
      vm.chart = createChart(element, {
        width: width,
        height: height,
        layout: {
          backgroundColor: 'transparent',
          textColor: 'rgba(255, 255, 255, 0.9)'
        },
        timeScale: {
          visible: true,
          barSpacing: element.offsetWidth / (vm.liquidationData.longs?.length + 4),
          tickMarkFormatter: (time) => {
            return `${time.day < 10 ? '0' + time.day : time.day}.${time.month < 10 ? '0' + time.month : time.month}`
          }
        },
        crosshair: {
          vertLine: {
            visible: false
          },
          horzLine: {
            visible: true,
            labelVisible: true
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
          visible: true,
          borderVisible: false,
          drawTicks: false,
          mode: PriceScaleMode.Normal,
          scaleMargins: {
            top: 0.35,
            bottom: 0.2
          }
        },
        localization: {
          priceFormatter: function (price) { return (vm.$numeral(price).format(vm.dataFormat)).toUpperCase() }
        }
      })

      const totalSeries = vm.chart.addAreaSeries({
        // title: 'Всего',
        topColor: '#2760f8',
        bottomColor: '#1e222d',
        lineColor: '#2760f8',
        lineWidth: 1
      })

      const longSeries = vm.chart.addLineSeries({
        // title: 'Длинные',
        color: '#16cb85',
        lineWidth: 2
      })

      const shortSeries = vm.chart.addLineSeries({
        // title: 'Короткие',
        color: '#f6465d',
        lineWidth: 2
      })

      totalSeries.setData(vm.liquidationData.totals)
      longSeries.setData(vm.liquidationData.longs)
      shortSeries.setData(vm.liquidationData.shorts)

      const container = document.createElement('div')
      document.body.appendChild(container)

      const toolTip = document.createElement('div')
      toolTip.className = 'floating-tooltip-2'
      container.appendChild(toolTip)

      vm.chart.subscribeCrosshairMove((param) => { vm.crossChairMove(param) })
    },
    crossChairMove (param) {
      const vm = this
      const values = Array.from(param.seriesPrices.entries())
      vm.activeDate = `${param.time.day < 10 ? '0' + param.time.day : param.time.day}.${param.time.month < 10 ? '0' + param.time.month : param.time.month}.${param.time.year}`

      vm.activeTotal = values[0][1]
      vm.activeLong = values[1][1]
      vm.activeShort = values[2][1]
    }

  },
  mounted () {
    const vm = this
    setTimeout(() => {
      if (!this.chart) {
        vm.loadLiquidations().then(() => {
          vm.createChart()
        })
      }
    }, 1000)
  },
  watch: {
    fullscreen () {
      const vm = this
      setTimeout(() => {
        if (!this.chart) {
          vm.loadLiquidations().then(() => {
            vm.createChart()
          })
        }
      }, 1000)
    },
    disableReload (val) {
      const vm = this
      if (val) {
        setTimeout(() => {
          if (!this.chart) {
            vm.loadLiquidations().then(() => {
              vm.createChart()
            })
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="sass">
.widget-liquidity-chart-full-screen
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 9999
</style>
