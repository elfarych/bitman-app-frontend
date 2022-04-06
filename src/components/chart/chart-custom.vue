<template>
<div class="chart-custom" id="chart-custom-id">
<div></div>
</div>
</template>

<script>
import { createChart } from 'lightweight-charts'
import config from 'src/config'
import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
export default {
  name: 'chart-custom',
  computed: {

  },
  methods: {
    async loadCandles () {
      const vm = this
      try {
        const candles = await axios.get(`${config.binanceAPIURI}/api/v3/klines`, {
          params: {
            symbol: 'BTCUSDT',
            limit: 24,
            interval: '1d'
          }
        }).then(res => {
          const candleData = []
          res.data.forEach(item => {
            const candle = {
              time: vm.$dayjs(item[0]).format('YYYY-MM-DD'),
              open: parseFloat(item[1]),
              high: parseFloat(item[2]),
              low: parseFloat(item[3]),
              close: parseFloat(item[4])
            }
            candleData.push(candle)
          })
          return candleData
        })

        return candles
      } catch (e) {
        errorHandler(e)
      }
    }
  },
  async mounted () {
    const element = document.getElementById('chart-custom-id')
    const chart = createChart(element, {
      width: element.offsetWidth,
      height: 500,
      layout: {
        backgroundColor: 'transparent',
        textColor: 'rgba(255, 255, 255, 0.9)'
      },
      grid: {
        vertLines: {
          color: 'transparent'
        },
        horzLines: {
          color: 'transparent'
        }
      }
    })
    const candleSeries = chart.addCandlestickSeries({
      upColor: 'rgba(255, 144, 0, 1)',
      downColor: '#000',
      borderDownColor: 'rgba(255, 144, 0, 1)',
      borderUpColor: 'rgba(255, 144, 0, 1)',
      wickDownColor: 'rgba(255, 144, 0, 1)',
      wickUpColor: 'rgba(255, 144, 0, 1)'
    })
    const candles = await this.loadCandles()
    candleSeries.setData(candles)
  }
}
</script>
