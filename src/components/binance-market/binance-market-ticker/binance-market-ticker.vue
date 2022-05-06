<template>
  <div class="">
<!--    Desktop ticker-->
    <q-item
      v-if="!$mobile"
      clickable
      class="q-pa-none full-width binance-orders-ticker binance-orders-ticker-card rounded-borders overflow-hidden binance-market-ticker"
      :to="{ name: 'market-ticker-detail', params: { symbol: slicedSymbol } }"
    >

      <div class="row full-width items-center">
        <!--    Name & -->
        <div class="ticker-token-name q-pl-sm col-4 q-pt-xs">
          <div class="flex items-center">
            <div class="text-center">
              <q-avatar size="30px" class="bg-transparent" square>
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

            <div class="cursor-pointer text-white text-subtitle1 f-w-800 q-ml-sm " style="line-height: 1.2">
              <div class="text-white-shadow-light relative-position flex items-start">
                <div>
                  {{ slicedSymbol }}
                </div>
                <small class="f-w-400 inline-block" style="font-size: 8px; margin-left: 3px" title="Ранг">{{ ticker.rank }}</small>
              </div>
              <small class="block f-w-200 small-text text-grey-5">{{ ticker.fullName }}</small>

              <div :class="priceClass" class="fontsize-13 flex items-center">
                ${{ ticker.lastPrice | tickerPriceFormatter }}
              </div>

            </div>
          </div>
          <binance-market-ticker-day-price-range
            :high-price="ticker.highPrice"
            :low-price="ticker.lowPrice"
            :last-price="ticker.lastPrice"
            style="margin: 3px 0"
          />
        </div>

        <!--    Change-->
        <div class="col-2 text-right">
          <small class="block f-w-400 small-text text-grey-5">изм. 24 часа</small>
          <div :class="changePercentValue > 0 ? 'text-positive' : 'text-negative'" class="f-w-800 text-subtitle1"
               style="line-height: 1 !important">
            <span class="">{{ changePercentValue > 0 ? '+' : '' }}</span>{{ changePercent }}%
          </div>

          <div v-if="ticker.priceChange >= 0.000001 || ticker.priceChange <= -0.000001" :class="ticker.priceChange >= 0 ? 'text-positive' : 'text-negative'" class="f-w-800 q-mt-xs" style="line-height: 1 !important">
            <span class="">{{ ticker.priceChange > 0 ? '+' : '' }}</span>{{ ticker.priceChange | tickerPriceFormatter }}$
          </div>
        </div>

        <div class="col-2 text-right q-pr-sm">

          <!--              Capitalization-->
          <small class="block f-w-400 small-text text-grey-5">market cap</small>
          <div class="f-w-800" style="line-height: 1 !important">
            <span v-if="ticker.marketCap" class="text-uppercase">{{ ticker.marketCap | tickerVolumeFormatter }}</span>
            <span v-else class="text-grey-5">No data</span>
          </div>

          <!--        Volume-->
          <small class="block f-w-400 small-text q-mt-xs text-grey-5">объем 24ч</small>
          <div class="f-w-800" style="line-height: 1 !important">
            <span v-if="ticker.volume" class="text-uppercase">{{ ticker.volume | tickerVolumeFormatter }}</span>
            <span v-else class="text-grey-5">No data</span>
          </div>

        </div>

        <!--        Chart-->
        <div class="col-4 text-right">
          <binance-market-ticker-chart :symbol="slicedSymbol" :chart-key="chartKey" :change="changePercentValue"/>
        </div>

      </div>

    </q-item>

<!--    Mobile ticker-->
    <binance-market-ticker-mobile
      v-if="$mobile"
      :ticker="ticker"
      :chart-key="chartKey"
    />
  </div>
</template>

<script>
import tickerPriceFormatter from 'src/filters/ticker-price-formatter'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'
import BinanceMarketTickerChart from 'components/binance-market/binance-market-ticker/binance-market-ticker-chart'
import WishlistBtn from 'components/wishlist/wishlist-btn'
import BinanceMarketTickerMobile from 'components/binance-market/binance-market-ticker/binance-market-ticker-mobile'
import BinanceMarketTickerDayPriceRange
from 'components/binance-market/binance-market-ticker/binance-market-ticker-day-price-range'

export default {
  name: 'binance-market-ticker',
  components: { BinanceMarketTickerDayPriceRange, BinanceMarketTickerMobile, WishlistBtn, BinanceMarketTickerChart },
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

// askPrice: "39480.00000000"
// askQty: "3.79059000"
// baseAsset: null
// bidPrice: "39479.99000000"
// bidQty: "4.04390000"
// circulatingSupply: 19031362
// closeTime: 1651756539667
// cmcUniqueId: 1
// count: 1310757
// dayChange: 1.41295791
// dayChangeAmount: 23141.35214184
// explorerUrls: null
// firstId: 1345919194
// fullName: "Bitcoin"
// highPrice: "40023.77000000"
// id: 14470644
// imageUrl: null
// issueDate: null
// issuePrice: null
// issuePriceUsed: null
// lastId: 1347229950
// lastPrice: "39464.94000000"
// lastQty: "0.26788000"
// localFullName: "Bitcoin"
// logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
// lowPrice: "38590.97000000"
// mapperName: "BTC"
// marketCap: 752106119992.6292
// maxSupply: 21000000
// name: "BTC"
// openPrice: "39017.48000000"
// openTime: 1651670139667
// prevClosePrice: "39017.48000000"
// price: 39519.30082527
// priceChange: "462.51000000"
// priceChangePercent: "1.156"
// quoteAsset: null
// quoteVolume: "2019850374.39549940"
// rank: 1
// slug: "bitcoin"
// source: null
// symbol: "BTCUSDT"
// tagInfos: [{…}]
// tags: ['pow']
// totalSupply: 19031362
// tradeUrl: null
// url: null
// volume: "51314.85224000"
// volumeGlobal: null
// website: null
// weightedAvgPrice: "39361.90569055"
</script>

<style lang="sass">
.binance-orders-ticker-card
  background: $dark
  padding: 0 0 0 3px

@media screen and (max-width: 700px)
  .binance-orders-ticker-volume, .binance-orders-ticker-min
    text-align: right
</style>
