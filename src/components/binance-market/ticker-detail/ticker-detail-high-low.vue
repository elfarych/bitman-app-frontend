<template>
  <div class="ticker-detail-high-low q-pa-sm fit">
    <div>
      <binance-market-ticker-day-price-range
        :low-price="dayMinHigh.low"
        :high-price="dayMinHigh.high"
        :last-price="dayMinHigh.lastPrice"
        :title="$t('hour24')"
        show-meta
        styles="height: 5px"
      />
    </div>

    <div v-if="coin" class="q-mt-sm">
      <binance-market-ticker-day-price-range
        :low-price="allTimeMinHigh.low"
        :high-price="allTimeMinHigh.high"
        :last-price="allTimeMinHigh.lastPrice"
        title="ATL / ATH"
        :high-title="allTimeTitle.high"
        :low-title="allTimeTitle.low"
        show-meta
        styles="height: 5px"
      />
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import BinanceMarketTickerDayPriceRange
from 'components/binance-market/binance-market-ticker/binance-market-ticker-day-price-range'

export default {
  name: 'ticker-detail-high-low',
  components: { BinanceMarketTickerDayPriceRange },
  computed: {
    ...mapState('tickerDetail', ['coin', 'ticker']),
    dayMinHigh () {
      const vm = this
      return {
        high: parseFloat(vm.ticker.h),
        low: parseFloat(vm.ticker.l),
        lastPrice: parseFloat(vm.ticker.c)
      }
    },
    allTimeTitle () {
      if (this.coin) {
        return {
          low: '' + this.allTimeChangePercentageFormatter(this.coin?.market_data.atl_change_percentage.usd) || '',
          high: '' + this.allTimeChangePercentageFormatter(this.coin?.market_data.ath_change_percentage.usd) || ''
        }
      } else {
        return { high: 0, low: 0 }
      }
    },
    allTimeMinHigh () {
      const vm = this
      return {
        high: parseFloat(vm.coin?.market_data.ath.usd || 0),
        low: parseFloat(vm.coin?.market_data.atl.usd || 0),
        lastPrice: parseFloat(vm.ticker.c)
      }
    }
  },
  methods: {
    allTimeChangePercentageFormatter (percent) {
      if (parseFloat(percent) > 0) {
        return '+' + new Intl.NumberFormat('en', { maximumFractionDigits: 2 }).format(parseFloat(percent))
      }
      return new Intl.NumberFormat('en', { maximumFractionDigits: 2 }).format(parseFloat(percent))
    }
  }
}
</script>

<style scoped>

</style>
