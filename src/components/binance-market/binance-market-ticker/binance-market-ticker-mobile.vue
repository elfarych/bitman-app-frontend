<template>
  <div class="">
    <q-item
      clickable
      class="q-pa-none full-width binance-orders-ticker binance-orders-ticker-card rounded-borders-xl overflow-hidden"
      :to="{ name: 'market-ticker-detail', params: { symbol: slicedSymbol } }"
    >

      <div class="row full-width items-center">
        <!--    Name & -->
        <div class="ticker-token-name q-pl-xs col-7">
          <div class="row">
            <div class="col-7 relative-position">
              <div class="flex items-center no-wrap">
                <div class="text-center">
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
                  <wishlist-btn :symbol="slicedSymbol" size="16px" class="text-white q-mt-xs"/>
                </div>

                <div class="cursor-pointer text-white text-subtitle2 f-w-800 q-ml-sm " style="line-height: 1.1">
                  <div class="text-white-shadow-light relative-position flex items-start">
                    <div>
                      {{ slicedSymbol }}
                    </div>
                  </div>
                  <div class="small-text text-grey-5 block f-w-400" style="line-height: 1">
                    <span class="f-w-400 inline-block text text-warning" title="Ранг">{{
                        ticker.rank
                      }}</span>
                    {{ ticker.fullName }}
                  </div>

                  <div :class="priceClass" class="small-text flex items-center q-mt-xs">
                    ${{ ticker.lastPrice | tickerPriceFormatter }}
                  </div>

                  <!--              Capitalization-->
                  <div v-if="ticker.market_cap" class="flex">
                <span class="block text-uppercase f-w-400" style="font-size: 10px; margin-top: 2px"
                      title="Рыночная капитализация">
                {{ ticker.market_cap | tickerVolumeFormatter }}
                </span>
                    <span
                      class="block text-uppercase f-w-400"
                      style="font-size: 7px; margin-left: 2px"
                      title="Рыночная капитализация (изменение за 24 часа)"
                      :class="ticker.market_cap_change_24h > 0 ? 'text-positive' : 'text-negative'"
                    >
                  <span v-if="ticker.market_cap_change_24h > 0">+</span>{{ ticker.market_cap_change_24h }}%
                </span>
                  </div>

                </div>
              </div>
              <binance-market-ticker-day-price-range
                :high-price="ticker.highPrice"
                :low-price="ticker.lowPrice"
                :last-price="ticker.lastPrice"
                style="margin: 3px 0"
              />

              <div class="full-height absolute-right" style="right: -10px; top: 0">
                <div :class="changePercentValue > 0 ? 'text-positive' : 'text-negative'" class="f-w-800 small-text"
                     style="line-height: 1 !important">
                  <span class="">{{ changePercentValue > 0 ? '+' : '' }}</span>{{ changePercent }}%
                </div>
              </div>
            </div>

            <div class="col-5 text-right l-h-12 q-pr-xs" style="line-height: 1">
              <small class="block small-text text-grey-5 f-w-400">volume 24h</small>
              <span v-if="ticker.volume" class="block text-uppercase f-w-800 fontsize-12">{{ ticker.volume | tickerVolumeFormatter }}</span>
              <span v-else class="block fontsize-12 text-grey-5">no data</span>

              <small class="block small-text text-grey-5 f-w-400">market cap</small>
              <span v-if="ticker.marketCap" class="block text-uppercase f-w-800 fontsize-12">{{ ticker.marketCap | tickerVolumeFormatter }}</span>
              <span v-else class="block fontsize-12 text-grey-5">no data</span>
            </div>
          </div>
        </div>

        <!--        Chart-->
        <div class="col-5">
          <binance-market-ticker-chart :symbol="slicedSymbol" :chart-key="chartKey" :change="changePercentValue"/>
        </div>

      </div>
    </q-item>

  </div>
</template>

<script>
import tickerPriceFormatter from 'src/filters/ticker-price-formatter'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'
import BinanceMarketTickerChart from 'components/binance-market/binance-market-ticker/binance-market-ticker-chart'
import WishlistBtn from 'components/wishlist/wishlist-btn'
import BinanceMarketTickerDayPriceRange
from 'components/binance-market/binance-market-ticker/binance-market-ticker-day-price-range'

export default {
  name: 'binance-market-ticker-mobile',
  components: { BinanceMarketTickerDayPriceRange, WishlistBtn, BinanceMarketTickerChart },
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
      return this.ticker.symbol.replace('USDT', '').replace('1000', '')
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

// askPrice: "38435.08000000"
// askQty: "3.17887000"
// ath_date: "2021-11-10T16:51:15Z"
// ath_price: 68692.137036932
// beta_value: 0.817958
// bidPrice: "38435.07000000"
// bidQty: "11.34394000"
// circulating_supply: 19029419
// closeTime: 1651574418617
// count: 1074844
// firstId: 1343711192
// highPrice: "39155.47000000"
// lastId: 1344786035
// lastPrice: "38400.08000000"
// lastQty: "0.00416000"
// logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
// lowPrice: "38052.00000000"
// market_cap: 731848747196
// market_cap_change_24h: -0.65
// max_supply: 21000000
// openPrice: "38813.82000000"
// openTime: 1651488018617
// percent_change_7d: -5.09
// percent_change_30d: -16.33
// percent_from_price_ath: -44.01
// prevClosePrice: "38815.00000000"
// priceChange: "-378.75000000"
// priceChangePercent: "-1.031"
// quoteVolume: "1874475533.22197640"
// rank: 1
// symbol: "BTCUSDT"
// total_supply: 19029419
// volume: "1874142198.47158110"
// volume_24h: 32772438131.900734
// volume_24h_change_24h: 9.07
// weightedAvgPrice: "38604.84208387"
</script>

<style lang="sass">
.binance-orders-ticker-card
  background: $dark
  padding: 0

@media screen and (max-width: 700px)
  .binance-orders-ticker-volume, .binance-orders-ticker-min
    text-align: right
</style>
