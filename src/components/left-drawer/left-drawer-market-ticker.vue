<template>
<div class="left-drawer-market-ticker q-mt-xs">
  <q-item
    clickable
    :title="ticker.name"
    class="q-px-none row items-center f-w-800 relative-position q-pt-sm"
    :to="{ name: 'market-ticker-detail', params: { symbol: slicedSymbol } }"
  >
    <div class="flex items-center col-5 no-wrap justify-between">
      <div class="flex items-center">
        <q-avatar size="20px" class="bg-transparent" square>
          <q-img
            v-if="ticker.logo"
            :src="ticker.logo"
            contain
            class="rounded-borders"
            img-class="white-shadow"
          >
            <template v-slot:loading>
              <q-skeleton class="fit"/>
            </template>
          </q-img>
        </q-avatar>
        <div class="q-ml-xs f-w-800 text-white-shadow-light">{{ slicedSymbol }}</div>
      </div>

      <chart-popup-btn v-if="$mobile" :chart-symbol="slicedSymbol" class="q-mr-xs" :change="changePercentValue"/>
      <chart-hover-btn v-else :chart-symbol="slicedSymbol" class="q-mr-xs" :change="changePercentValue"/>
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
    <div class="left-drawer-market-ticker-price-range">
      <binance-market-ticker-day-price-range
        :high-price="ticker.highPrice"
        :low-price="ticker.lowPrice"
        :last-price="ticker.lastPrice"
        style="margin: 3px 0"
        styles="height: 2px"
      />
    </div>
  </q-item>
</div>
</template>

<script>
import tickerPriceFormatter from 'src/filters/ticker-price-formatter'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'
import ChartPopupBtn from 'components/chart/chart-popup-btn'
import ChartHoverBtn from 'components/chart/chart-hover-btn'
import WishlistBtn from 'components/wishlist/wishlist-btn'
import BinanceMarketTickerDayPriceRange
from 'components/binance-market/binance-market-ticker/binance-market-ticker-day-price-range'

export default {
  name: 'left-drawer-market-ticker',
  components: { BinanceMarketTickerDayPriceRange, WishlistBtn, ChartHoverBtn, ChartPopupBtn },
  props: {
    ticker: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    slicedSymbol () {
      return this.ticker.symbol.replace('USDT', '').replace('1000', '')
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

.left-drawer-market-ticker-price-range
  position: absolute
  bottom: -6px
  left: 30px
  width: 80%
</style>
