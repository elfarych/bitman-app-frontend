<template>
  <div class="ticker-main-info fit ">
    <portal to="title">
      <div class="flex items-center">
        <div class="text-subtitle1 f-w-800" style="line-height: 0.8">
          {{ $route.params.symbol }}<br>
          <span class="text-uppercase small-text f-w-400">usdt</span>
        </div>
        <div>
          <div class="text-subtitle2 f-w-600 q-ml-md l-h-12">
            {{ price }}
          </div>
          <div class="text-subtitle2 f-w-600 q-ml-md l-h-12" :class="ticker.P > 0 ? 'text-positive' : 'text-negative'" style="margin-top: -3px">
            {{ ticker.P > 0 ? '+' : '' }}{{ changePercent || '' }}%
          </div>
        </div>

      </div>
    </portal>
    <div class="ticker-main-info-card flex no-wrap justify-between items-center rounded-borders">

      <!--      Logo & Name-->
      <div class="flex items-center no-wrap">
        <q-avatar :size="$mobile ? '40px' : '50px'" class=" bg-transparent" square>
          <q-img
            v-if="tickerInfo.logo"
            :src="tickerInfo.logo"
            contain
            class="rounded-borders"
            img-class="white-shadow"
          >
            <template v-slot:loading>
              <q-skeleton class="fit"/>
            </template>
          </q-img>
        </q-avatar>
        <div class="q-ml-sm">
          <!--          Name-->
          <div>
            <h1 class="text-h6 f-w-800 text-uppercase text-white-shadow" style="line-height: 1">
              {{ tickerInfo.name || symbol }}</h1>

            <!--          Symbol-->
            <small class="f-w-600">{{ ticker.s }}</small>
          </div>

          <!--          Price-->
          <div v-if="ticker.e" class="f-w-800 text-h6 q-mt-xs" style="line-height: 1">$ {{ price || '' }}
          </div>
        </div>
      </div>

      <!--      Change & Volume-->
      <div class="tickers-info-card-price">

        <!--        Change-->
        <div
          class="text-subtitle1 f-w-800 text-right ticker-detail-volume flex justify-end column"
          style="line-height: 1.2"
        >
          <small class="f-w-400 small-text block text-right">
            изм. 24h
          </small>
          <div v-if="ticker.e" :class="ticker.P > 0 ? 'text-positive' : 'text-negative'">
            {{ ticker.P > 0 ? '+' : '' }}{{ changePercent || '' }}%
          </div>
        </div>
        <!--        Volume-->
        <div class="text-subtitle1 f-w-800 text-right q-mt-sm" style="line-height: 1.2">
          <small class="f-w-400 small-text block">
            объем 24h
          </small>
          <div v-if="ticker.e" class="text-uppercase no-wrap">
            {{ volume | tickerVolumeFormatter }}
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'

export default {
  name: 'ticker-main-info',
  filters: {
    tickerVolumeFormatter
  },
  computed: {
    ...mapState('tickerDetail', ['ticker', 'tickerInfo']),
    symbol () {
      return this.$route.params.symbol
    },
    price () {
      if (parseFloat(this.ticker.c) > 1000) {
        return new Intl.NumberFormat('ru').format(parseFloat(this.ticker.c))
      }
      return parseFloat(this.ticker.c)
    },
    changePercent () {
      return this.ticker.P ? parseFloat(this.ticker.P).toFixed(2) : ''
    },
    changePrice () {
      if (parseFloat(this.ticker.c) > 1000) {
        return this.ticker.p ? parseFloat(this.ticker.p) : ''
      }
      return this.ticker.p ? parseFloat(this.ticker.p) : ''
    },
    volume () {
      return this.ticker.q
    }
  },
  methods: {}
}

// "e": "24hrTicker",  // Event type
// "E": 123456789,     // Event time
// "s": "BNBBTC",      // Symbol
// "p": "0.0015",      // Price change
// "P": "250.00",      // Price change percent
// "w": "0.0018",      // Weighted average price
// "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
// "c": "0.0025",      // Last price
// "Q": "10",          // Last quantity
// "b": "0.0024",      // Best bid price
// "B": "10",          // Best bid quantity
// "a": "0.0026",      // Best ask price
// "A": "100",         // Best ask quantity
// "o": "0.0010",      // Open price
// "h": "0.0025",      // High price
// "l": "0.0010",      // Low price
// "v": "10000",       // Total traded base asset volume
// "q": "18",          // Total traded quote asset volume
// "O": 0,             // Statistics open time
// "C": 86400000,      // Statistics close time
// "F": 0,             // First trade ID
// "L": 18150,         // Last trade Id
// "n": 18151          // Total number of trades

// INFO
//   category: "coin"
//   contract_address: [{contract_address: "0x64ff637fb478863b7468bc97d30a5bf3a428a1fd",…},…]
// date_added: "2015-08-07T00:00:00.000Z"
// date_launched: null
// description: "Ethereum (ETH) is a cryptocurrency . Users are able to generate ETH through the process of mining. Ethereum has a current supply of 119,794,653.374. The last known price of Ethereum is 3,007.29998841 USD and is up 0.85 over the last 24 hours. It is currently trading on 5533 active market(s) with $18,005,308,252.47 traded over the last 24 hours. More information can be found at https://www.ethereum.org/."
// id: 1027
// is_hidden: 0
// logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
// name: "Ethereum"
// notice: ""
// platform: null
// self_reported_circulating_supply: null
// self_reported_market_cap: null
// self_reported_tags: null
// slug: "ethereum"
// subreddit: "ethereum"
// symbol: "ETH"
</script>

<style lang="sass">
.ticker-main-info-card
  //border-radius: 15px
  padding: 10px
  //background: $dark

</style>
