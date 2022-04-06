<template>
  <div class="ticker-detail-trade-button flex flex-center column fit q-py-sm rounded-borders">
    <div class="flex items-center">
      <logos-binance imgStyle="width: 20px; height: 20px"/>
      <div class="text-subtitle1 f-w-800 text-uppercase q-ml-xs">Trade on Binance</div>
    </div>

    <div class="flex no-wrap">
        <q-btn
          label="Spot"
          color="warning"
          outline
          size="sm"
          class="rounded-borders f-w-800 q-mt-sm q-px-sm"
          type="a"
          target="_blank"
          :href="binanceSpotTradeURI + '?ref=368026154'"
        />

        <q-btn
          v-if="tickerFuturesInfo"
          label="Futures"
          color="warning"
          outline
          class="rounded-borders f-w-800 q-mt-sm q-px-sm q-ml-sm"
          type="a"
          size="sm"
          target="_blank"
          :href="binanceFuturesTradeURI + '?ref=368026154'"
        />

    </div>

  </div>
</template>

<script>
import LogosBinance from 'components/logos/logos-binance'
import config from 'src/config'
import { mapState } from 'vuex'

export default {
  name: 'ticker-detail-trade-button',
  components: { LogosBinance },
  computed: {
    ...mapState('tickerDetail', ['tickerFuturesInfo']),
    binanceSpotTradeURI () {
      return `${config.binanceTradeURI}/${this.$route.params.symbol}_USDT`
    },
    binanceFuturesTradeURI () {
      return `${config.binanceFuturesTradeURI}/${this.$route.params.symbol}USDT`
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-trade-button
  height: 127px
  //border-radius: 15px
  background: $dark

@media screen and (max-width: 700px)
  .ticker-detail-trade-button
    margin-top: 10px
</style>
