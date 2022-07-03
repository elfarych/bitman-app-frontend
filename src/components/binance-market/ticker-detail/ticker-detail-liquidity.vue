<template>
<div class="ticker-detail-liquidity f-w-800">
  <div v-if="liquidity.totalSum" >
    <div class="flex justify-between items-center q-mt-lg">
      <div class="text-subtitle1 text-uppercase f-w-800 ">{{ $t('liquidations') }}</div>
      <q-btn-group>
        <q-btn
          label="1h"
          color="secondary"
          :text-color="interval === '1h' ? 'dark' : ''"
          :outline="interval !== '1h'"
          class="f-w-800"
          size="sm"
          @click="setLiquidityInterval('1h')"
        />
        <q-btn
          label="4h"
          color="secondary"
          :text-color="interval === '4h' ? 'dark' : ''"
          :outline="interval !== '4h'"
          class="f-w-800"
          size="sm"
          @click="setLiquidityInterval('4h')"
        />
        <q-btn
          label="24h"
          color="secondary"
          size="sm"
          :text-color="interval === '24h' ? 'dark' : ''"
          :outline="interval !== '24h'"
          class="f-w-800"
          @click="setLiquidityInterval('24h')"
        />
      </q-btn-group>
    </div>

    <div class="q-mt-xs">{{ $t('totalSum') }}: <span class="text-uppercase text-subtitle1 f-w-800">{{ liquidity.totalSum | tickerVolumeFormatter }}</span></div>

    <div class="orders-len text-subtitle2 f-w-800">
      <div class="absolute-left bg-positive buys-width-len transition-1" :style="`width: ${liquidity.longs}%`"></div>
      <span class="absolute-left q-pl-sm">{{ liquidity.longs }}%</span>
      <span class="absolute-right q-pr-sm">{{ liquidity.shorts }}%</span>
    </div>

    <div class="flex justify-between text-subtitle2 f-w-800 q-mt-xs text-uppercase">

      <div class="text-positive">
        Longs
      </div>
      <div class="text-negative">
        Shorts
      </div>
    </div>
  </div>

  <div v-else class="text-h6 text-grey fit flex flex-center f-w-800">
    <div >No data</div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'

export default {
  name: 'ticker-detail-liquidity',
  computed: {
    ...mapState('info', ['liquidity'])
  },
  filters: {
    tickerVolumeFormatter
  },
  methods: {
    ...mapActions('info', ['loadLiquidity']),
    setLiquidityInterval (interval) {
      this.interval = interval
      this.loadLiquidity(interval)
    }
  },
  data () {
    return {
      interval: '24h'
    }
  },
  mounted () {
    setTimeout(() => {
      this.loadLiquidity(this.interval)
    }, 1000)
  },
  watch: {

    '$route.params.symbol' () {
      this.loadLiquidity(this.interval)
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-liquidity
  //background: $dark
  //border-radius: 15px
  padding: 10px

  .orders-len
    position: relative
    background: $negative
    width: 100%
    height: 20px
</style>
