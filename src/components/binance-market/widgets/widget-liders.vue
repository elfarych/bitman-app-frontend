<template>
<div class="widget-liders">
    <binance-market-ticker
      v-for="ticker in sortedSymbols"
      :key="ticker.symbol"
      :ticker="ticker"
      :chart-key="futures.toString()"
      class="q-mt-sm"
    />
</div>
</template>

<script>
import { mapState } from 'vuex'
import BinanceMarketTicker from 'components/binance-market/binance-market-ticker/binance-market-ticker'

export default {
  name: 'widget-liders',
  components: { BinanceMarketTicker },
  props: {
    up: {
      type: Boolean,
      default: true
    },
    futures: {
      type: Boolean,
      default: false
    },
    showCount: {
      type: Number,
      default: 15
    }
  },
  computed: {
    ...mapState('binanceMarket', ['symbols', 'futureSymbols']),
    sortedSymbols () {
      const sortedSymbols = this.futures ? [...this.futureSymbols] : [...this.symbols]

      if (this.up) {
        return sortedSymbols.sort((a, b) => b.priceChangePercent - a.priceChangePercent).slice(0, this.showCount)
      }
      return sortedSymbols.sort((a, b) => a.priceChangePercent - b.priceChangePercent).slice(0, this.showCount)
    }
  }
}
</script>

<style scoped>

</style>
