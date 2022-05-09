<template>
  <div class="coins-global-market-volume bg-dark rounded-borders q-pa-sm relative-position">
      <div class="f-w-800">
        Объем за сутки
      </div>

      <div v-if="globalData" class="f-w-800 text-h6 text-uppercase text-secondary absolute-bottom-right q-pa-sm">
        {{ globalData.total_volume.usd | bigNumberFormatter }}
      </div>
  </div>
</template>

<script>
import bigNumberFormatter from 'src/filters/big-number-formatter'
import { mapState } from 'vuex'

export default {
  name: 'coins-global-market-volume',
  filters: {
    bigNumberFormatter
  },
  computed: {
    ...mapState('coins', ['globalData'])
  }
}
</script>

<style lang="sass">
.coins-global-market-volume
  height: 80px
</style>
