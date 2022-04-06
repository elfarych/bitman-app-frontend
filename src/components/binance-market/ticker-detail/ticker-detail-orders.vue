<template>
<div class="ticker-detail-orders rounded-borders">
  <div class="f-w-800 relative-position flex items-center justify-between">
    <div>
      Лимитные заявки <span class="text-uppercase">Binance {{ market }}</span>
    </div>
  </div>

  <div class="flex justify-between">
    <div class="q-mt-sm">от {{ formattedRange }}$</div>
    <q-btn
      icon="refresh"
      flat dense
      color="secondary"
      :disable="disableLoader"
      @click="reloadOrders"
    >
    </q-btn>
  </div>
  <div class="q-mb-sm">
    <q-slider
      v-model="range"
      :min="1000"
      :max="2000000"
      :step="50000"
      track-size="10px"
      color="secondary"
    />
  </div>

  <div class="row q-col-gutter-md">
    <div class="col-6">
      <div class="f-w-600 text-positive">Buy limit</div>
      <div class="orders-asks flex justify-between small-text q-pr-md">
        <div>Цена</div>
        <div>Объем $</div>
      </div>
      <q-separator class="q-mb-sm"/>
      <q-scroll-area style="height: 330px" class="q-pr-md" :thumb-style="thumbStyle">
        <div
          v-for="(bid, index) in bids"
          :key="index"

          class="orders-asks flex justify-between relative-position"
        >
          <div class="orders-bids-values" :style="getBidWidth(bid[1])"></div>
          <div class="order-asks-price">{{ bid[0] }}</div>
          <div class="order-asks-volume text-positive f-w-600 text-uppercase">{{ getUsdVolume(bid[1]) }}</div>
        </div>
      </q-scroll-area>

    </div>

    <div class="col-6">
      <div class="f-w-600 text-negative">Sell limit</div>
      <div class="orders-asks flex justify-between small-text q-pr-md">
        <div>Цена</div>
        <div>Объем $</div>
      </div>
      <q-separator class="q-mb-sm"/>

      <q-scroll-area style="height: 330px" class="q-pr-md" :thumb-style="thumbStyle">
        <div
          v-for="(ask, index) in asks"
          :key="index"
          class="orders-asks flex justify-between relative-position"
        >
          <div class="orders-ask-values" :style="getAskWidth(ask[1])"></div>
          <div class="order-asks-price">{{ ask[0] }}</div>
          <div class="order-asks-volume text-negative f-w-600 text-uppercase">{{ getUsdVolume(ask[1]) }}</div>
        </div>
      </q-scroll-area>

    </div>
  </div>

  <div class="q-mt-md text-right">
    <q-btn-group>
      <q-btn
        label="Spot"
        color="primary"
        :text-color="market === 'spot' ? 'dark' : ''"
        :outline="market !== 'spot'"
        class="f-w-800"
        @click="setMarket('spot')"
      />
      <q-btn
        label="Futures"
        color="primary"
        :text-color="market === 'futures' ? 'dark' : ''"
        :outline="market !== 'futures'"
        class="f-w-800"
        @click="setMarket('futures')"
      />
    </q-btn-group>
  </div>

</div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'

export default {
  name: 'ticker-detail-orders',
  filters: {
    tickerVolumeFormatter
  },
  computed: {
    ...mapState('tickerDetail', ['tickerAskOrders', 'tickerBidOrders', 'ticker', 'tickerFuturesBidOrders', 'tickerFuturesAskOrders']),
    formattedRange () {
      return new Intl.NumberFormat('ru').format(this.range)
    },
    bidsMax () {
      return Math.max(...this.bids.map(item => parseFloat(item[1])))
    },

    asksMax () {
      return Math.max(...this.asks.map(item => parseFloat(item[1])))
    },
    tickerPrice () {
      return parseFloat(this.ticker.c)
    },
    asks () {
      const orders = this.market === 'spot' ? this.tickerAskOrders : this.tickerFuturesAskOrders
      return orders.filter(item => item[1] >= this.range / this.tickerPrice)
    },
    bids () {
      const orders = this.market === 'spot' ? this.tickerBidOrders : this.tickerFuturesBidOrders
      return orders.filter(item => item[1] >= this.range / this.tickerPrice)
    }

  },
  data () {
    return {
      range: 50000,
      disableLoader: false,
      market: 'spot',
      thumbStyle: {
        right: '1px',
        borderRadius: '5px',
        width: '3px',
        opacity: 0.2
      }
    }
  },
  methods: {
    ...mapActions('tickerDetail', ['loadTickerOrders', 'loadTickerFuturesOrders']),
    getUsdVolume (val) {
      return this.$numeral((val * this.tickerPrice)).format('(0.00a)').replace('(', '- ').replace(')', '')
    },
    getBidWidth (val) {
      return { width: (parseFloat(val) * 100 / this.bidsMax * 1.2).toFixed(3) + '%' }
    },
    getAskWidth (val) {
      return { width: (parseFloat(val) * 100 / this.asksMax * 1.2).toFixed(3) + '%' }
    },

    reloadOrders () {
      this.disableLoader = true
      this.loadTickerOrders()
      setTimeout(() => {
        this.loadTickerFuturesOrders()
      }, 1500)

      setTimeout(() => {
        this.disableLoader = false
      }, 10000)
    },
    setMarket (val) {
      this.market = val
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-orders
  background: $dark
  height: 550px
  //border-radius: 15px
  padding: 10px

  iframe
    background: $dark !important

    html.theme-dark .widgetbar-tabs
      background: $dark !important

  .orders-bids-values
    background: rgba(22,203,133, 0.15)
    position: absolute
    left: 0
    height: 100%
    z-index: -1

  .orders-ask-values
    background: rgba(246,69,91, 0.15)
    position: absolute
    left: 0
    height: 100%
    z-index: -1

</style>
