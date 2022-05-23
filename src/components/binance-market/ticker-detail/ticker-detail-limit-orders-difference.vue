<template>
  <div class="ticker-detail-limit-orders-difference fit rounded-borders-xl secondary-border secondary-shadow-inset">
    <div class="flex justify-between relative-position q-pr-lg">
      <div class="f-w-800" style="line-height: 1.2">Соотношение лимитных заявок
        <span class="block text-warning">Binance {{ futures ? 'Futures' : 'Spot' }}</span></div>
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

    <div class="small-text q-mt-sm">Данные основаны на последних {{ futures ? '2 000' : '10 000' }}<br> лимитных ордерах
      биржи Binance<br> в диапазоне
      <span class="f-w-800 text-primary">{{ percent }}%</span> от текущей цены
    </div>

    <div class="">
      <q-slider
        color="secondary"
        v-model="percent"
        :step="1"
        :min="1"
        :max="20"
      />
    </div>

    <div class="flex justify-between">
      <small>
        Buy limits
      </small>
      <small>
        Sell limits
      </small>
    </div>
    <div class="orders-len text-subtitle2 f-w-800 q-mt-xs">
      <div class="absolute-left bg-positive buys-width-len transition-1" :style="`width: ${buysWidth}%`"></div>
      <span class="absolute-left q-pl-sm">{{ buysWidth }}%</span>
      <span class="absolute-right q-pr-sm">{{ 100 - buysWidth }}%</span>
    </div>

    <div class="flex justify-between f-w-800 q-mt-xs text-uppercase">

      <div class="text-positive">
        {{ buyLimitsSum | tickerVolumeFormatter }}
      </div>
      <div class="text-negative">
        {{ sellLimitsSum | tickerVolumeFormatter }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'

export default {
  name: 'ticker-detail-limit-orders-difference',
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
    ...mapState('tickerDetail', ['tickerAskOrders', 'tickerBidOrders', 'tickerFuturesBidOrders', 'tickerFuturesAskOrders', 'ticker']),
    tickerPrice () {
      return parseFloat(this.ticker.c)
    },
    // Buy limits
    buyLimitsSum () {
      let sum = 0

      const bidOrders = this.futures ? this.tickerFuturesBidOrders : this.tickerBidOrders

      bidOrders.forEach(item => {
        if (this.getChangePercent(item[0], this.tickerPrice) < this.percent) {
          sum += item[1] * this.tickerPrice
        }
      })

      return sum
    },
    // Sell limits
    sellLimitsSum () {
      let sum = 0
      const askOrders = this.futures ? this.tickerFuturesAskOrders : this.tickerAskOrders
      askOrders.forEach(item => {
        if (this.getChangePercent(item[0], this.tickerPrice) < this.percent) {
          sum += item[1] * this.tickerPrice
        }
      })

      return sum
    },

    buysWidth () {
      const sum = this.buyLimitsSum + this.sellLimitsSum
      return Math.round(this.buyLimitsSum * 100 / sum) || 0
    }
  },
  data () {
    return {
      percent: 5,
      disableLoader: false
    }
  },
  methods: {
    ...mapActions('tickerDetail', ['loadTickerOrders', 'loadTickerFuturesOrders']),
    getChangePercent (val1, val2) {
      if (typeof val1 === 'string' || typeof val2 === 'string') {
        val1 = parseFloat(val1)
        val2 = parseFloat(val2)
      }
      return Math.abs((val2 - val1) / val1 * 100)
    },
    reloadOrders () {
      this.disableLoader = true
      this.futures ? this.loadTickerFuturesOrders() : this.loadTickerOrders()
      setTimeout(() => {
        this.disableLoader = false
      }, 10000)
    }
  },
  created () {
    if (this.futures) {
      setTimeout(() => {
        this.loadTickerFuturesOrders()
      }, 5000)
    }
  },
  watch: {
    '$route.params.symbol' () {
      if (this.futures) {
        this.loadTickerFuturesOrders()
      }
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
