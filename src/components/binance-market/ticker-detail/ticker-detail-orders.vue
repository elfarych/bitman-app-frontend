<template>
<div class="ticker-detail-orders rounded-borders-xl secondary-shadow-inset secondary-border">
  <div class="f-w-800 relative-position flex items-center justify-between">
    <div>
      <span class="text-uppercase text-warning">Binance {{ market }}</span> {{ $t('limitOrders') }}
    </div>
  </div>

  <div class="flex justify-between">
    <div class="q-mt-sm">min {{ formattedRange }}$</div>
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
      <div class="f-w-600 text-positive">Buy limits</div>
      <div class="orders-asks flex justify-between small-text q-pr-md">
        <div>{{ $t('price') }}</div>
        <div>{{ $t('volume') }} $</div>
      </div>
      <q-separator class="q-mb-sm"/>
      <q-scroll-area style="height: 350px" class="q-pr-md" :thumb-style="thumbStyle">
        <div
          v-for="(bid, index) in bids"
          :key="index"

          class="orders-asks flex justify-between relative-position"
        >
          <div class="orders-bids-values" :style="getLineWidth(bid[1], bid[0])"></div>
          <div class="order-asks-price">{{ bid[0] }}</div>
          <div class="order-asks-volume text-positive f-w-600 text-uppercase">{{ getUsdVolume(bid[1], bid[0]) }}</div>
        </div>
      </q-scroll-area>

    </div>

    <div class="col-6">
      <div class="f-w-600 text-negative">Sell limits</div>
      <div class="orders-asks flex justify-between small-text q-pr-md">
        <div>{{ $t('price') }}</div>
        <div>{{ $t('volume') }} $</div>
      </div>
      <q-separator class="q-mb-sm"/>

      <q-scroll-area style="height: 350px" class="q-pr-md" :thumb-style="thumbStyle">
        <div
          v-for="(ask, index) in asks"
          :key="index"
          class="orders-asks flex justify-between relative-position"
        >
          <div class="orders-ask-values" :style="getLineWidth(ask[1], ask[0])"></div>
          <div class="order-asks-price">{{ ask[0] }}</div>
          <div class="order-asks-volume text-negative f-w-600 text-uppercase">{{ getUsdVolume(ask[1], ask[0]) }}</div>
        </div>
      </q-scroll-area>

    </div>
  </div>

<!--  <div class="q-mt-md text-right rounded-borders-xl shadow-0">-->
<!--    <q-btn-group unelevated>-->
<!--      <q-btn-->
<!--        label="Spot"-->
<!--        color="secondary"-->
<!--        :flat="market !== 'spot'"-->
<!--        :text-color="market === 'spot' ? 'dark' : ''"-->
<!--        :outline="market !== 'spot'"-->
<!--        class="f-w-800 rounded-borders-xl"-->
<!--        unelevated-->
<!--        @click="setMarket('spot')"-->
<!--      />-->
<!--      <q-btn-->
<!--        label="Futures"-->
<!--        color="secondary"-->
<!--        :flat="market !== 'futures'"-->
<!--        :text-color="market === 'futures' ? 'dark' : ''"-->
<!--        :outline="market !== 'futures'"-->
<!--        unelevated-->
<!--        class="f-w-800 rounded-borders-xl q-ml-xs"-->
<!--        @click="setMarket('futures')"-->
<!--      />-->
<!--    </q-btn-group>-->
<!--  </div>-->

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
    getUsdVolume (quantity, price) {
      return this.$numeral((quantity * parseFloat(price))).format('(0.00a)').replace('(', '- ').replace(')', '')
    },
    getLineWidth (quantity, price) {
      return { width: ((quantity * parseFloat(price)) * 100 / 1000000) + '%' }
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
  height: 525px
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
