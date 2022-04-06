<template>
  <div class="" style="margin-top: 5px">
    <q-item
      clickable
      class="q-pa-none full-width binance-orders-ticker binance-orders-ticker-card rounded-borders overflow-hidden"
      :to="{ name: 'market-ticker-detail', params: { symbol: slicedSymbol } }"
    >

      <div class="row full-width items-center">
        <!--    Name & -->
        <div class="ticker-token-name col-md-3 col-6 q-pl-sm">
          <div class="flex items-center">
            <q-avatar :size="$mobile ? '20px' : '30px'" class="bg-transparent" square>
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
            <div class="cursor-pointer text-white text-subtitle1 f-w-800 q-ml-sm" style="line-height: 0">
              {{ slicedSymbol }}
            </div>
          </div>

          <div :class="priceClass" class="q-mt-sm">${{ ticker.lastPrice | tickerPriceFormatter }}</div>

          <div v-if="$mobile">
            <div :class="changePercentValue > 0 ? 'text-positive' : 'text-negative'" class="f-w-800"
                 style="line-height: 1.2 !important">
              <span>{{ changePercentValue > 0 ? '+' : '' }}</span>{{ changePercent }}%
            </div>
          </div>

        </div>

        <!--        Chart-->
        <div class="col-md-4 col-6" v-if="$mobile">
          <binance-market-ticker-chart :symbol="slicedSymbol" :chart-key="chartKey" :change="changePercentValue" />
        </div>

<!--        &lt;!&ndash;    price&ndash;&gt;-->
<!--        <div class="f-w-800 col-sm-2 col-3" style="line-height: 1.2">-->
<!--          <small class="block f-w-400 small-text">Цена</small>-->
<!--          {{ ticker.lastPrice | tickerPriceFormatter }}-->
<!--        </div>-->

        <!--    Change-->
        <div v-if="!$mobile" class="col-sm-2 col-6 ">
          <small class="block f-w-400 small-text">Изм 24H</small>
          <div :class="changePercentValue > 0 ? 'text-positive' : 'text-negative'" class="f-w-800 text-subtitle1"
               style="line-height: 1.2 !important">
            <span class="">{{ changePercentValue > 0 ? '+' : '' }}</span>{{ changePercent }}%
          </div>
        </div>

        <!--        Volume-->
        <div v-if="!$mobile" class="f-w-800 col-md-2 col-3 binance-orders-ticker-volume" style="line-height: 1.2">
          <small class="block f-w-400 small-text">Объем 24H</small>
          <span class="text-uppercase text-subtitle1 f-w-800">{{ ticker.volume | tickerVolumeFormatter }}</span>
        </div>

        <!--        Chart-->
        <div class="col-md-5 col-6 text-right" v-if="!$mobile">
          <binance-market-ticker-chart :symbol="slicedSymbol" :chart-key="chartKey" :change="changePercentValue"/>
        </div>

      </div>

    </q-item>

  </div>
</template>

<script>
import tickerPriceFormatter from 'src/filters/ticker-price-formatter'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'
import BinanceMarketTickerChart from 'components/binance-market/binance-market-ticker-chart'

export default {
  name: 'binance-market-ticker',
  components: { BinanceMarketTickerChart },
  props: {
    ticker: {
      type: Object,
      default: () => {
      }
    },
    chartKey: String
  },
  computed: {
    slicedSymbol () {
      return this.ticker.symbol.replace('USDT', '')
    },
    changePercent () {
      return this.changePercentValue.toFixed(2)
    },
    changePercentValue () {
      return this.ticker.priceChangePercent
    }
  },
  filters: {
    tickerPriceFormatter, tickerVolumeFormatter
  },

  data () {
    return {
      bids: [],
      asks: [],
      price: this.ticker.lastPrice,
      priceClass: 'text-white'
    }
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

// askPrice: "0.00931500"
// askQty: "24.92300000"
// bidPrice: "0.00931400"
// bidQty: "37.24100000"
// closeTime: 1646209272925
// count: 113958
// firstId: 180386731
// highPrice: "0.00976900"
// lastId: 180500688
// lastPrice: "0.00931400"
// lastQty: "0.26500000"
// lowPrice: "0.00913700"
// openPrice: "0.00951600"
// openTime: 1646122872925
// prevClosePrice: "0.00951600"
// priceChange: "-0.00020200"
// priceChangePercent: "-2.123"
// quoteVolume: "1930.99154097"
// symbol: "BNBBTC"
// volume: "206505.05200000"
// weightedAvgPrice: "0.00935082"
</script>

<style lang="sass">
.binance-orders-ticker-card
  background: $dark
  padding: 5px 0 5px 5px

@media screen and (max-width: 700px)
  .binance-orders-ticker-volume, .binance-orders-ticker-min
    text-align: right
</style>
