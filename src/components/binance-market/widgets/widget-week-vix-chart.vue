<template>
  <div
    :key="`${fullscreen}`"
    class="widget-week-vix-chart rounded-borders relative-position q-pb-lg"
    :style="fullscreen ? '' : 'height: 300px'"
    :class="fullscreen ? 'widget-week-vix-chart-full-screen' : ''"
  >
    <q-btn
      :icon-right="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
      dense no-caps
      class="q-ma-md absolute-top-right"
      color="secondary"
      @click="setScreen"
    />
    <div class="f-w-800 text-subtitle1 text-uppercase q-pb-md">
      Индекс страха и жадности
    </div>

    <div class="q-mt-sm  f-w-800 flex justify-center absolute-bottom-left q-pa-md">
      <div class="flex  items-center">
        <span class="block q-mr-xs" style="width: 10px; height: 10px; border-radius: 4px; background: #f3ba2e; margin-top: -1px"></span>
        Bitcoin
      </div>

      <div class="flex  items-center q-ml-lg">
        <span class="block q-mr-xs" style="width: 10px; height: 10px; border-radius: 4px; background: #2760f8; margin-top: -1px"></span>
        Индекс страха
      </div>
    </div>

    <div id="vix-week-chart" class="fit transition-1" :style="`opacity: ${chart ? 1 : 0}`"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createChart } from 'lightweight-charts'

export default {
  name: 'widget-week-vix-chart',
  computed: {
    ...mapState('info', ['weekVixData'])
  },
  data () {
    return {
      fullscreen: false,
      chart: null,
      createChartTimer: null
    }
  },
  methods: {
    createChart (id = 'vix-week-chart') {
      const vm = this

      if (vm.chart) return

      const element = document.getElementById(id)
      vm.chart = createChart(element, {
        width: element.offsetWidth - 10,
        height: element.offsetHeight - 55,
        layout: {
          backgroundColor: 'transparent',
          textColor: 'rgba(255, 255, 255, 0.9)'
        },
        timeScale: {
          visible: true,
          barSpacing: element.offsetWidth / (vm.weekVixData?.length + 4)
        },
        crosshair: {
          vertLine: {
            visible: false
          },
          horzLine: {
            visible: true
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
          borderVisible: false
        },
        leftPriceScale: {
          visible: true,
          borderVisible: false
        }
      })

      const vixSeries = vm.chart.addAreaSeries({
        topColor: '#2760f8',
        bottomColor: '#1e222d',
        lineColor: '#2760f8',
        lineWidth: 2
      })

      const btcSeries = vm.chart.addLineSeries({
        priceScaleId: 'left',
        color: '#f3ba2e',
        lineWidth: 1
      })

      btcSeries.setData(vm.weekVixData.map(item => {
        return {
          time: Number(item.time),
          value: parseInt(item.btcValue)
        }
      }))

      vixSeries.setData(vm.weekVixData.map(item => {
        return {
          time: Number(item.time),
          value: item.vixValue
        }
      }))
    },
    setScreen () {
      this.chart = null
      this.fullscreen = !this.fullscreen
    }
  },
  beforeDestroy () {
    this.chart = null
    if (this.createChartTimer) clearTimeout(this.createChartTimer)
  },
  mounted () {
    if (this.createChartTimer) clearTimeout(this.createChartTimer)
    this.createChartTimer = setTimeout(() => {
      if (!this.chart) this.createChart()
    }, 3000)
  },
  watch: {
    weekVixData () {
      if (!this.chart) this.createChart()
    },
    fullscreen () {
      setTimeout(() => {
        if (!this.chart) this.createChart()
      }, 1000)
    }
  }
}
</script>

<style lang="sass">
.widget-week-vix-chart-full-screen
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 9999
  background: rgba(0,0,0,.9)
</style>
