<template>
<div class="ticker-detail-limit-orders-difference fit rounded-borders-xl secondary-shadow-inset secondary-border">
  <div class="flex justify-between relative-position q-pr-lg">
    <div class="f-w-800" style="line-height: 1.2">{{ $t('tradesOrdersRatio') }}
      <span class="block text-warning">Binance {{ futures ? 'Futures' : 'Spot' }}</span>
    </div>
    <q-btn
      icon="refresh"
      flat dense
      size="sm"
      class="absolute-top-right"
      color="secondary"
      :disable="disableLoader"
      @click="reloadOrders"
    >
    </q-btn>
  </div>

<!--  <div class="small-text q-mt-sm">Данные основаны <br>на последних <span class="f-w-800 text-primary">{{ count }}</span><br> ордерах биржи Binance</div>-->

  <div class="">
    <q-slider
      color="secondary"
      v-model="count"
      :step="100"
      :min="100"
      :max="1000"
    />
  </div>

  <div class="flex justify-between">
    <small>
      Buy
    </small>
    <small>
      Sell
    </small>
  </div>
  <div class="orders-len text-subtitle2 f-w-800 q-mt-xs">
    <div class="absolute-left bg-positive transition-1" :style="`width: ${buysWidth}%`"></div>
    <span class="absolute-left q-pl-sm">{{ buysWidth }}%</span>
    <span class="absolute-right q-pr-sm">{{ 100 - buysWidth }}%</span>
  </div>

  <div class="flex justify-between f-w-800 q-mt-xs text-uppercase">

    <div class="text-positive">
      {{ buyRecentSum | tickerVolumeFormatter }}
    </div>
    <div class="text-negative">
      {{ sellRecentSum | tickerVolumeFormatter }}
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'

export default {
  name: 'ticker-detail-recent-orders-difference',
  props: {
    futures: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    tickerVolumeFormatter
  },
  computed: {
    ...mapState('tickerDetail', ['tickerAskRecentOrders', 'tickerBidRecentOrders', 'ticker', 'tickerFuturesAskRecentOrders', 'tickerFuturesBidRecentOrders']),
    tickerPrice () {
      return parseFloat(this.ticker.c)
    },
    slicedBidOrders () {
      const bidOrders = this.futures ? this.tickerFuturesBidRecentOrders : this.tickerBidRecentOrders
      return bidOrders.slice(0, this.count)
    },

    slicedAskOrders () {
      const askOrders = this.futures ? this.tickerFuturesAskRecentOrders : this.tickerAskRecentOrders
      return askOrders.slice(0, this.count)
    },
    // Buy limits
    buyRecentSum () {
      let sum = 0

      this.slicedBidOrders.forEach(item => {
        sum += item[1] * this.tickerPrice
      })

      return sum
    },
    // Sell Recents
    sellRecentSum () {
      let sum = 0
      this.slicedAskOrders.forEach(item => {
        sum += item[1] * this.tickerPrice
      })

      return sum
    },

    buysWidth () {
      const sum = this.buyRecentSum + this.sellRecentSum
      return Math.round(this.buyRecentSum * 100 / sum) || 0
    }
  },
  data () {
    return {
      count: 1000,
      disableLoader: false
    }
  },
  methods: {
    ...mapActions('tickerDetail', ['loadRecentOrders', 'loadFuturesRecentOrders']),
    getChangePercent (val1, val2) {
      if (typeof val1 === 'string' || typeof val2 === 'string') {
        val1 = parseFloat(val1)
        val2 = parseFloat(val2)
      }
      return Math.abs((val2 - val1) / val1 * 100)
    },
    reloadOrders () {
      this.disableLoader = true
      this.futures ? this.loadFuturesRecentOrders() : this.loadRecentOrders()
      setTimeout(() => {
        this.disableLoader = false
      }, 10000)
    }
  },
  created () {
    if (this.futures) {
      setTimeout(() => {
        this.loadFuturesRecentOrders()
      }, 5000)
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-limit-orders-difference
  background: $dark
  //border-radius: 15px
  padding: 10px

  .orders-len
    position: relative
    background: $negative
    width: 100%
    height: 20px
</style>
