<template>
  <div class="trader-wishlist">
    <div class="row q-col-gutter-sm">
      <div
        v-for="ticker in filteredTickers"
        :key="ticker.symbol"
        class="col-md-6 col-12"
      >
        <binance-market-ticker :ticker="ticker"/>
      </div>
    </div>
  </div>
</template>

<script>
import BinanceMarketTicker from 'components/binance-market/binance-market-ticker/binance-market-ticker'
import { mapState } from 'vuex'

export default {
  name: 'trader-wishlist',
  components: { BinanceMarketTicker },
  computed: {
    ...mapState('wishlist', ['wishlist']),
    ...mapState('binanceMarket', ['symbols']),
    filteredTickers () {
      return this.symbols
        .filter(item => this.wishlist.includes(item.symbol.replace('USDT', '')))
    }
  }
}

</script>

<style scoped>

</style>
