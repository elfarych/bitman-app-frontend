<template>
<div class="coins-global-market-cap bg-dark rounded-borders-xl q-pa-sm relative-position ">
    <div class="f-w-800 text-subtitle1 l-h-12">
      {{ $t('marketCap') }}
    </div>

    <div v-if="globalData" class="absolute-bottom-right q-pa-sm flex items-baseline">
     <div
       :class="$mobile ? 'text-h5' : 'text-h4'"
       class="f-w-800 text-uppercase text-secondary text-secondary-shadow"
     >
       {{ globalData.total_market_cap.usd | bigNumberFormatter }}
     </div>
      <div :class="globalData.market_cap_change_percentage_24h_usd > 0 ? 'text-positive' : 'text-negative'" class="f-w-800">
        <span v-if="globalData.market_cap_change_percentage_24h_usd > 0">+</span>{{ formattedMarketCapChangePercent }}%
      </div>
    </div>
</div>
</template>

<script>
import bigNumberFormatter from 'src/filters/big-number-formatter'
import { mapState } from 'vuex'
export default {
  name: 'coins-global-market-cap',
  filters: {
    bigNumberFormatter
  },
  computed: {
    ...mapState('coins', ['globalData']),
    formattedMarketCapChangePercent () {
      return this.globalData.market_cap_change_percentage_24h_usd.toFixed(2)
    }
  }
}
</script>

<style lang="sass">
.coins-global-market-cap
  height: 130px
</style>
