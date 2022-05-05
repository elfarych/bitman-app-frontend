<template>
<div class="left-drawer-market-ticker">
  <q-item
    clickable
    :title="ticker.name"
    class="q-px-sm row items-center f-w-800"
    :to="{ name: 'market-ticker-detail', params: { symbol: slicedSymbol } }"
  >
    <div class="flex items-center col-5 no-wrap">
      <chart-popup-btn v-if="$mobile" :chart-symbol="slicedSymbol" class="q-mr-xs" :change="changePercentValue"/>
      <chart-hover-btn v-else :chart-symbol="slicedSymbol" class="q-mr-xs" :change="changePercentValue"/>
      <div class="q-ml-xs f-w-800 text-white-shadow-light">{{ slicedSymbol }}</div>
    </div>

    <div class="text-right col-3" :class="priceClass">
      {{ ticker.lastPrice | tickerPriceFormatter }}
    </div>

    <div class="col-3 text-right">
      <div :class="changePercentValue > 0 ? 'text-positive' : 'text-negative'" style="line-height: 1.2 !important">
        <span>{{ changePercentValue > 0 ? '+' : '' }}</span>{{ changePercent }}%
      </div>
    </div>
    <div class="col-1 q-pl-xs">
      <wishlist-btn :symbol="slicedSymbol" size="16px"/>
    </div>

  </q-item>

  <q-separator class=""/>
</div>
</template>

<script>
import tickerPriceFormatter from 'src/filters/ticker-price-formatter'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'
import ChartPopupBtn from 'components/chart/chart-popup-btn'
import ChartHoverBtn from 'components/chart/chart-hover-btn'
import WishlistBtn from 'components/wishlist/wishlist-btn'

export default {
  name: 'left-drawer-market-ticker',
  components: { WishlistBtn, ChartHoverBtn, ChartPopupBtn },
  props: {
    ticker: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    slicedSymbol () {
      return this.ticker.symbol.replace('USDT', '')
    },
    changePercent () {
      return this.changePercentValue.toFixed(2)
    },
    changePercentValue () {
      return parseFloat(this.ticker.priceChangePercent)
    }
  },
  data () {
    return {
      price: this.ticker.lastPrice,
      priceClass: 'text-white'
    }
  },
  filters: {
    tickerPriceFormatter, tickerVolumeFormatter
  },
  watch: {
    ticker () {
      if (this.price < this.ticker.lastPrice) {
        this.priceClass = 'text-positive'
      } else if (this.price > this.ticker.lastPrice) {
        this.priceClass = 'text-negative'
      }
      this.price = this.ticker.lastPrice
    }
  }
}
</script>

<style lang="sass">
.left-drawer-market-ticker
  font-size: 13px

  .q-item
    min-height: 20px
    padding: 3px 8px

.left-drawer-market-ticker-grid
  display: grid
  grid-template-columns: 2fr 1fr 1fr 1fr
  align-items: center
</style>
