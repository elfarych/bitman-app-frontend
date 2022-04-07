<template>
<div class="ticker-detail-chart-controls">
  <div class="flex justify-between" style="padding-right: 13px">
    <div>
      <q-btn
        label="TradingView"
        :color="ordersChartMode ? 'white' : 'primary'"
        flat dense no-caps
        class="f-w-600"
        @click="changeChartMode('tradingView')"
      />

      <q-btn
        label="Заявки"
        :color="ordersChartMode ? 'primary' : 'white'"
        flat dense no-caps
        class="f-w-600 q-ml-sm"
        @click="changeChartMode('orders')"
      />
    </div>
      <div>
        <q-btn
          v-if="!ordersChartMode"
          label="На весь экран"
          icon="fullscreen"
          color="secondary"
          flat dense no-caps
          outline
          @click="showChartPopup"
        />
      </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'ticker-detail-chart-controls',
  computed: {
    ordersChartMode () {
      return this.$route.query.chartMode && this.$route.query.chartMode.toString() === 'orders'
    }
  },
  methods: {
    changeChartMode (mode) {
      const vm = this
      if (vm.$route.query.chartMode !== mode) {
        this.$router.replace({
          query: {
            ...this.$route.query,
            chartMode: mode
          }
        })
      }
    },
    showChartPopup (event) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          chart: this.$route.params.symbol
        }
      })
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-chart-controls
  position: relative
  bottom: -7px
  left: 3px

@media screen and (max-width: 700px)
  .ticker-detail-chart-controls
    display: none
</style>
