<template>
<div class="widget-week-vix-chart">
 <div class="f-w-800 text-subtitle1 text-center">
   Индекс страха и жадности
 </div>

  <div class="q-mt-sm  f-w-800 flex justify-center">
    <div class="flex  items-center">
      <span class="block q-mr-xs" style="width: 10px; height: 10px; border-radius: 4px; background: #f3ba2e;"></span>
      Bitcoin
    </div>

    <div class="flex  items-center q-ml-lg">
    <span class="block q-mr-xs" style="width: 10px; height: 10px; border-radius: 4px; background: #2760f8;"></span>
    Индекс страха
  </div>
  </div>

  <div id="vix-week-chart" style="height: 210px"></div>
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
  methods: {
    createChart () {
      const vm = this
      const element = document.getElementById('vix-week-chart')
      const chart = createChart(element, {
        width: element.offsetWidth - 3,
        height: 200,
        layout: {
          backgroundColor: 'transparent',
          textColor: 'rgba(255, 255, 255, 0.9)'
        },
        timeScale: {
          visible: true,
          barSpacing: element.offsetWidth / 100
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
          visible: true
        },
        leftPriceScale: {
          visible: true
        }
      })

      const vixSeries = chart.addAreaSeries({
        topColor: '#2760f8',
        bottomColor: '#1e222d',
        lineColor: '#2760f8',
        lineWidth: 2
      })

      const btcSeries = chart.addLineSeries({
        priceScaleId: 'left',
        color: '#f3ba2e',
        lineWidth: 1
      })

      btcSeries.setData(vm.weekVixData.map(item => {
        return {
          time: Number(item.time),
          value: item.btcValue
        }
      }))

      vixSeries.setData(vm.weekVixData.map(item => {
        return {
          time: Number(item.time),
          value: item.vixValue
        }
      }))
    }
  },
  mounted () {
    this.createChart()
  },
  watch: {
    weekVixData () {
      this.createChart()
    }
  }
}
</script>

<style scoped>

</style>
