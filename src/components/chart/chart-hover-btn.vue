<template>
<div class="chart-hover-btn">
  <q-btn
    class=" rounded-borders f-w-600"
    :color="change > 0 ? 'positive' : 'negative'"
    outline flat dense
    size="sm"
    @click.stop="showChartPopup($event)"
  >
    <q-icon :name="change > 0 ? 'trending_up' : 'trending_down'"/>
    <q-tooltip>Quick view</q-tooltip>
  </q-btn>
</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'chart-hover-btn',
  props: {
    chartSymbol: String,
    change: Number
  },
  methods: {
    ...mapMutations('binanceMarket', ['mutationHoverSymbol']),
    showChartPopup (event) {
      event.preventDefault()
      event.stopPropagation()
      this.mutationHoverSymbol(this.chartSymbol)
    }
  }
}
</script>

<style scoped>

</style>
